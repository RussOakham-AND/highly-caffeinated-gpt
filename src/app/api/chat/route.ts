import { ChatRequestMessageUnion } from '@azure/openai'
import { auth } from '@clerk/nextjs/server'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

import { openAiClient } from '@/services/azure-openai/azure-openai-client'

export async function POST(req: Request) {
	try {
		const { userId } = auth()

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

		const body = (await req.json()) as { messages: ChatRequestMessageUnion[] }

		const deploymentId = 'gpt-4'

		const azure = await openAiClient.getChatCompletions(
			deploymentId,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			body.messages,
			{
				temperature: 0.5,
				maxTokens: 1600,
			},
		)

		return NextResponse.json(azure.choices[0].message?.content)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR },
		)
	}
}
