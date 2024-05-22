import { useSuspenseQuery } from '@tanstack/react-query'

import { getMessages } from '@/services/server-actions/queries/getMessages'

export const useGetChatQuery = () => {
	const query = useSuspenseQuery({
		queryKey: ['chat'],
		queryFn: () => getMessages(),
	})

	return [query.data]
}
