import { useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Message {
	id: number
	role: 'user' | 'agent'
	content: string
}

export const useGetChatQuery = () => {
	const query = useSuspenseQuery({
		queryKey: ['chat'],
		queryFn: async () => {
			const response = await axios.get<Message[]>('/api/chat')
			return response.data
		},
	})

	return [query.data]
}
