import { useQuery } from '@tanstack/react-query'

import { getMessages } from '@/services/server-actions/queries/getMessages'

export const useGetChatQuery = () => {
	const query = useQuery({
		queryKey: ['chat'],
		queryFn: () => getMessages(),
	})

	return [query.data]
}
