import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

export const usePostChatMessage = () => {
	return useMutation({
		mutationFn: async (messages: ChatCompletionMessageParam[]) => {
			const response = await axios.post<string | null | undefined>(
				'/api/chat',
				{
					messages,
				},
			)

			return response
		},
	})
}
