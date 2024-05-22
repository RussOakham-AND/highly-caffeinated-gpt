import { useSuspenseQuery } from '@tanstack/react-query'

interface Message {
	id: number
	role: 'user' | 'agent'
	content: string
}

export const useGetChatQuery = () => {
	const query = useSuspenseQuery({
		queryKey: ['chat'],
		queryFn: async () => {
			const response = await fetch('/api/chat', {
				cache: 'no-store',
			})
			return response.json()
		},
	})

	return [query.data as Message[]]
}
