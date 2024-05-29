interface ChatResponseBody {
	id: string
	text: string
	createdAt: string
	updatedAt: string
	isUserMessage: boolean
	role: string
	chatId: string | null
}

interface MessagesProps {
	messages: ChatResponseBody[]
}

export const Messages = ({ messages }: MessagesProps) => {
	console.log(messages)

	return <div>Messages</div>
}
