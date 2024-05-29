import { z } from 'zod'

export const createChatSchema = z.object({
	'user-role': z.string({
		required_error: 'Please select a role',
	}),
})

export type CreateChatInput = z.infer<typeof createChatSchema>
