'use client'

import { notFound } from 'next/navigation'

import { trpc } from '@/app/_trpc/client'

import { ChatWrapper } from '../_components/chat/chat-wrapper'

export default function ChatIdPage({ params }: { params: { chatId: string } }) {
	const { data, isFetching, isError, error, isSuccess } =
		trpc.getChatInfo.useQuery({ chatId: params.chatId })

	if (isFetching && !data) {
		return <div>Loading...</div>
	}

	if (isError || !isSuccess) {
		return <div>Error: {error?.message}</div>
	}

	if (!data) {
		notFound()
	}

	return <ChatWrapper chatId={data.id} />
}
