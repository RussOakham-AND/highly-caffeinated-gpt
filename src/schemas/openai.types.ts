import { z } from 'zod'

export const messageSchema = z.object({
	content: z.string(),
	role: z.enum(['user', 'agent']),
})

export type Message = z.infer<typeof messageSchema>

export const openAiResponseBody = z.object({
	id: z.string(),
	content: z.string().nullish(),
	created: z.date(),
	role: z.enum(['user', 'agent']),
})

export type OpenAiResponseBody = z.infer<typeof openAiResponseBody>

export const openAiResponseSchema = z.object({
	status: z.number(),
	data: openAiResponseBody,
})

export type OpenAiResponse = z.infer<typeof openAiResponseSchema>
