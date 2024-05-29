import { z } from 'zod'

export const sendMessageValidator = z.object({
	messagesPayload: z.array(
		z.object({
			role: z.string(),
			content: z.string(),
		}),
	),
})
