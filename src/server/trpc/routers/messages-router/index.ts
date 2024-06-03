import { ChatRequestMessageUnion } from '@azure/openai'
import { TRPCError } from '@trpc/server'

import { db } from '@/db'
import { env } from '@/env.mjs'
import { getChatMessagesSchema, postChatMessageSchema } from '@/schemas/chat'
import { openAiClient } from '@/services/azure-openai/azure-openai-client'

import { privateProcedure, router } from '../../trpc'

export const messagesRouter = router({
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

			const messages = await db.message.findMany({
				where: {
					chatId: dbChat.id,
				},
				orderBy: {
					createdAt: 'asc',
				},
			})

			const azureMessages: ChatRequestMessageUnion[] = messages.map(
				(message) => {
					return {
						role: message.role,
						content: message.text,
					}
				},
			)

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
