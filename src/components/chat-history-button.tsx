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
	} = trpc.getChatMessages.useQuery({ chatId: chat.id })

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

	return (
		<Link
			href={`/chat/${chat.id}?role=${messages[0]?.role ?? 'user'}`}
			legacyBehavior
			passHref
		>
			<Button variant="outline" id={chat.id}>
				{messages[0]?.text ?? 'New Chat'}
			</Button>
		</Link>
	)
}
