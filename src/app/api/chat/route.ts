import { auth } from '@clerk/nextjs/server'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// import { openAiClient } from '@/services/azure-openai/azure-openai-client'

export function GET() {
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

	// const deploymentId = 'gpt-4'

	// const messages = [
	// 	{
	// 		role: 'system',
	// 		content: 'You are a helpful assistant. You will talk like a pirate.',
	// 	},
	// 	{ role: 'user', content: 'Can you help me?' },
	// 	{
	// 		role: 'assistant',
	// 		content: 'Arrrr! Of course, me hearty! What can I do for ye?',
	// 	},
	// 	{ role: 'user', content: "What's the best way to train a parrot?" },
	// ]

	// const completions = await openAiClient.streamChatCompletions(
	// 	deploymentId,
	// 	messages,
	// 	{
	// 		temperature: 0.5,
	// 		maxTokens: 1600,
	// 	},
	// )

	// // NEED AZURE API KEYS!
	// console.log(completions)

	return NextResponse.json([
		{
			id: 1,
			role: 'agent',
			content: 'Hi, how can I help you today?',
		},
		{
			id: 2,
			role: 'user',
			content: "Hey, I'm having trouble with my account.",
		},
		{
			id: 3,
			role: 'agent',
			content: 'What seems to be the problem?',
		},
		{
			id: 4,
			role: 'user',
			content: "I can't log in.",
		},
	])
}
