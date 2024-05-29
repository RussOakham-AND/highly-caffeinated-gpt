import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

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

		const body = await req.json()

		const requestBody = sendMessageValidator.parse(body)

		const azure = await openAiClient.getChatCompletions(
			env.AZURE_OPEN_API_DEPLOYMENT_NAME,
			requestBody.messagesPayload,
			{
				temperature: 0.5,
				maxTokens: 1600,
			},
		)

		const response = {
			role: azure.choices[0].message?.role,
			content: azure.choices[0].message?.content,
		}

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