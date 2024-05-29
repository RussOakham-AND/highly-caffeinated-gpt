import { ChatRequestMessageUnion } from '@azure/openai'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TRPCError } from '@trpc/server'

import { db } from '@/db'
import { env } from '@/env.mjs'
import {
	createChatSchema,
	getChatInfoSchema,
	getChatMessagesSchema,
	postChatMessageSchema,
} from '@/schemas/chat'
import { openAiClient } from '@/services/azure-openai/azure-openai-client'

import { privateProcedure, publicProcedure, router } from './trpc'

export const appRouter = router({
	authCallback: publicProcedure.query(async () => {
		const { getUser } = getKindeServerSession()

		const user = await getUser()

		if (!user?.id) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		// Check if user is in database
		const dbUser = await db.user.findFirst({
			where: {
				id: user.id,
			},
		})

		if (!dbUser) {
			// User is not in database
			// Create user in database
			await db.user.create({
				data: {
					id: user.id,
					email: user.email ?? '',
					firstName: user.given_name,
					lastName: user.family_name,
				},
			})
		}

		return { success: true }
	}),
	createChat: privateProcedure
		.input(createChatSchema)
		.mutation(async ({ ctx, input }) => {
			const dbChat = await db.chat.create({
				data: {
					User: {
						connect: {
							id: ctx.userId,
						},
					},
				},
			})

			return { chatId: dbChat.id, role: input['user-role'] }
		}),
	getChatInfo: privateProcedure
		.input(getChatInfoSchema)
		.query(async ({ ctx, input }) => {
			const dbChatHistory = await db.chat.findFirst({
				where: {
					id: input.chatId,
					userId: ctx.userId,
				},
			})

			if (!dbChatHistory) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			return dbChatHistory
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

export type AppRouter = typeof appRouter
