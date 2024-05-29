import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db'
import { env } from '@/env.mjs'
import { sendMessageValidator } from '@/lib/validators/send-message-validator'
import { openAiClient } from '@/services/azure-openai/azure-openai-client'

export async function POST(req: NextRequest) {
	try {
		const { getUser } = getKindeServerSession()

		const user = await getUser()

		const userId = user?.id

		if (!userId) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
					message: 'You must be logged in to access this resource.',
				},
				{
					status: StatusCodes.UNAUTHORIZED,
				},
			)
		}

		const dbUser = await db.user.findFirst({
			where: {
				id: userId,
			},
		})

		if (!dbUser) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
					message: 'You must be logged in to access this resource.',
				},
				{
					status: StatusCodes.UNAUTHORIZED,
				},
			)
		}

		const body = await req.json()

		const { chatId, messagesPayload } = sendMessageValidator.parse(body)

		let dbChatId

		if (!chatId) {
			// create chat
			const response = await db.chat.create({
				data: {
					User: {
						connect: {
							id: userId,
						},
					},
				},
			})

			dbChatId = response.id
		} else {
			const chat = await db.chat.findFirst({
				where: {
					id: chatId,
					userId,
				},
			})

			if (!chat) {
				return NextResponse.json(
					{
						error: 'Not Found',
						message: 'Chat not found',
					},
					{
						status: StatusCodes.NOT_FOUND,
					},
				)
			}

			dbChatId = chat.id
		}

		await db.message.create({
			data: {
				Chat: {
					connect: {
						id: dbChatId,
					},
				},
				role: messagesPayload[0].role,
				text: messagesPayload[0].content,
				isUserMessage: true,
			},
		})

		const azure = await openAiClient.getChatCompletions(
			env.AZURE_OPEN_API_DEPLOYMENT_NAME,
			messagesPayload,
			{
				temperature: 0.5,
				maxTokens: 1600,
			},
		)

		const response = {
			role: azure.choices[0].message?.role,
			content: azure.choices[0].message?.content,
		}

		await db.message.create({
			data: {
				Chat: {
					connect: {
						id: dbChatId,
					},
				},
				role: response.role ?? 'assistant',
				text: response.content ?? '',
				isUserMessage: false,
			},
		})

		return NextResponse.json(response)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR },
		)
	}
}

// Data Structures
// Create Unique Chat ID and attach individual messages to ChatId
// On Post and Response
