import { auth } from '@clerk/nextjs/server'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

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
