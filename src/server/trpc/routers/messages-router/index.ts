import { ChatRequestMessageUnion } from '@azure/openai'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db } from '@/db'
import { env } from '@/env.mjs'
import { getChatMessagesSchema, postChatMessageSchema } from '@/schemas/chat'
import { openAiClient } from '@/services/azure-openai/azure-openai-client'

import { privateProcedure, router } from '../../trpc'

export const messagesRouter = router({
	getInfiniteChatMessages: privateProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).nullish(),
				cursor: z.string().nullish(),
				chatId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { userId } = ctx
			const { cursor } = input
			const limit = input.limit ?? 10

			const dbUser = await db.user.findFirst({
				where: {
					id: userId,
				},
			})

			if (!dbUser) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			const messages = await db.message.findMany({
				take: limit + 1,
				where: {
					chatId: input.chatId,
				},
				orderBy: {
					createdAt: 'desc',
				},
				cursor: cursor ? { id: cursor } : undefined,
			})

			// eslint-disable-next-line no-undef-init
			let nextCursor: typeof cursor | undefined = undefined

			if (messages.length > limit) {
				const nextItem = messages.pop()
				nextCursor = nextItem?.id
			}

			return {
				messages,
				nextCursor,
			}
		}),
	getChatMessages: privateProcedure
		.input(getChatMessagesSchema)
		.query(async ({ ctx, input }) => {
			const dbUser = await db.user.findFirst({
				where: {
					id: ctx.userId,
				},
			})

			if (!dbUser) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			const dbMessages = await db.message.findMany({
				where: {
					chatId: input.chatId,
				},
				orderBy: {
					createdAt: 'asc',
				},
			})

			return dbMessages
		}),
	postChatMessage: privateProcedure
		.input(postChatMessageSchema)
		.mutation(async ({ ctx, input }) => {
			const dbUser = await db.user.findFirst({
				where: {
					id: ctx.userId,
				},
			})

			if (!dbUser) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			const dbChat = await db.chat.findFirst({
				where: {
					id: input.chatId,
					userId: dbUser.id,
				},
			})

			if (!dbChat) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			await db.message.create({
				data: {
					Chat: {
						connect: {
							id: dbChat.id,
						},
					},
					role: input.message[0].role,
					text: input.message[0].content,
					isUserMessage: true,
				},
			})

			// Fetch previous 30 messages from db to use as context
			const messages = await db.message.findMany({
				take: 30,
				where: {
					chatId: dbChat.id,
				},
				orderBy: {
					createdAt: 'desc',
				},
			})

			const chronologicalOrderMessages = messages.toReversed()

			const azureMessages: ChatRequestMessageUnion[] =
				chronologicalOrderMessages.map((message) => {
					return {
						role: message.role,
						content: message.text,
					}
				})

			const azure = await openAiClient.getChatCompletions(
				env.AZURE_OPEN_API_DEPLOYMENT_NAME,
				azureMessages,
				{
					temperature: 0.5,
					maxTokens: 1600,
				},
			)

			const response = {
				role: azure.choices[0].message?.role,
				content: azure.choices[0].message?.content,
			}

			await db.message.create({
				data: {
					Chat: {
						connect: {
							id: dbChat.id,
						},
					},
					role: response.role ?? 'assistant',
					text: response.content ?? '',
					isUserMessage: false,
				},
			})

			return response
		}),
})
