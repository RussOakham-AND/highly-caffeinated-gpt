'use client'

import { PuffLoader } from 'react-spinners'
import Link from 'next/link'

import { trpc } from '@/app/_trpc/client'

import { Button } from './ui/button'

export interface Chat {
	id: string
	userId: string
	createdAt: string
	updatedAt: string
}

interface ChatHistoryButtonProps {
	chat: Chat
}

export const ChatHistoryButton = ({ chat }: ChatHistoryButtonProps) => {
	const {
		data: messages,
		isFetching,
		isError,
		isSuccess,
	} = trpc.messages.getChatMessages.useQuery({ chatId: chat.id })

	if (isFetching && !messages) {
		return (
			<Button variant="outline" id={chat.id} disabled>
				<PuffLoader
					size={8}
					className="h-5 items-center justify-center"
					color="rgb(220, 38, 38)"
				/>
			</Button>
		)
	}

	if (isError || !isSuccess) {
		return (
			<Button variant="outline" id={chat.id} disabled>
				Oops, something went wrong
			</Button>
		)
	}

	const lastUserMessage = messages.findLast(
		(message) => message.role !== 'assistant',
	)

	return (
		<Link
			href={`/chat/${chat.id}?role=${messages[messages.length - 1]?.role ?? 'user'}`}
			legacyBehavior
			passHref
		>
			<Button variant="outline" className="block truncate px-4" id={chat.id}>
				{lastUserMessage?.text ?? 'New Chat'}
			</Button>
		</Link>
	)
}
