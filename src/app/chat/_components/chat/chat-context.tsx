import { createContext, useCallback, useMemo, useState } from 'react'
import { ChatRequestMessageUnion } from '@azure/openai'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type StreamResponse = {
	addMessage: ({ role, content }: { role: string; content: string }) => void
	messages: ChatRequestMessageUnion[]
	isLoading: boolean
}

export const ChatContext = createContext<StreamResponse>({
	addMessage: () => {},
	messages: [],
	isLoading: false,
})

interface ChatResponseBody {
	role: string
	content: string
}

interface ChatContextProviderProps {
	children: React.ReactNode
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
	const [messages, setMessages] = useState<ChatRequestMessageUnion[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const { mutate: sendMessage } = useMutation({
		mutationFn: async ({
			chatId,
			messages: messagesPayload,
		}: {
			chatId?: string
			messages: ChatRequestMessageUnion[]
		}) => {
			const response = await axios.post<ChatResponseBody>('/api/chat', {
				chatId,
				messagesPayload,
			})

			return response.data
		},
		onMutate: () => {
			setIsLoading(true)
		},
		onError: () => {
			setIsLoading(false)
			toast.error('Something went wrong')
		},
		onSuccess: () => {
			setIsLoading(false)
		},
		onSettled: () => {
			setIsLoading(false)
		},
	})

	const addMessage = useCallback(
		(incomingMessage: { role: string; content: string }) => {
			setMessages((current) => [...current, incomingMessage])

			sendMessage({ messages })
		},
		[messages, sendMessage],
	)

	const value = useMemo(
		() => ({
			addMessage,
			messages,
			isLoading,
		}),
		[addMessage, messages, isLoading],
	)

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
