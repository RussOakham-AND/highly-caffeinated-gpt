import { notFound } from 'next/navigation'

import { serverCaller } from '@/app/_trpc/server-client'

import { ChatWrapper } from '../_components/chat-wrapper'

export default async function ChatIdPage({
	params,
}: {
	params: { chatId: string }
}) {
	const chatInfo = await serverCaller.chat.getChatInfo({
		chatId: params.chatId,
	})

	if (!chatInfo) {
		notFound()
	}

	return <ChatWrapper chatId={chatInfo.id} />
}
