import { notFound } from 'next/navigation'

import { serverCaller } from '@/app/_trpc/server-client'

import { ChatWrapper } from '../_components/chat/chat-wrapper'

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

	const chatMessages = await serverCaller.messages.getChatMessages({
		chatId: chatInfo.id,
	})

	return <ChatWrapper chatId={chatInfo.id} initialMessages={chatMessages} />
}
