import { z } from 'zod'

export const sendMessageValidator = z.object({
	chatId: z.string().nullish(),
	messagesPayload: z.array(
		z.object({
			role: z.string(),
			content: z.string(),
		}),
	),
})
