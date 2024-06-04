import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'

import type { AppRouter } from '@/server/trpc/routers'

type RouterInput = inferRouterInputs<AppRouter>
type RouterOutput = inferRouterOutputs<AppRouter>

export const createChatSchema = z.object({
	'user-role': z.string({
		required_error: 'Please select a role',
	}),
})

export type CreateChatInput = z.infer<typeof createChatSchema>

export const getChatInfoSchema = z.object({
	chatId: z.string(),
})

export type GetChatHistoryInput = z.infer<typeof getChatInfoSchema>

export const chatMessageSchema = z.object({
	role: z.string(),
	content: z.string(),
})

export type ChatMessage = z.infer<typeof chatMessageSchema>

export const getChatMessagesSchema = z.object({
	chatId: z.string(),
})

export type GetChatMessagesInput = z.infer<typeof getChatMessagesSchema>

export const postChatMessageSchema = z.object({
	chatId: z.string(),
	message: z.array(chatMessageSchema),
})

export type PostChatMessageInput2 = RouterInput['messages']['postChatMessage']

export type PostChatMessageInput = z.infer<typeof postChatMessageSchema>

export type MessagesInfiniteQuery =
	RouterOutput['messages']['getInfiniteChatMessages']

export type Message =
	RouterOutput['messages']['getInfiniteChatMessages']['messages'][0]
