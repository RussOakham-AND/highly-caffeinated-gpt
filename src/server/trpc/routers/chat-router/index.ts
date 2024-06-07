import { TRPCError } from '@trpc/server'
import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { createChatSchema, getChatInfoSchema } from '@/schemas/chat'
import { db as drizzDb } from '@/services/drizzle/db'
import { Chat } from '@/services/drizzle/schema'

import { privateProcedure, router } from '../../trpc'

export const chatRouter = router({
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
			const dbChatHistory = await drizzDb.query.Chat.findFirst({
				where: and(eq(Chat.id, input.chatId), eq(Chat.userId, ctx.userId)),
			})

			if (!dbChatHistory) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			return dbChatHistory
		}),
	getAllChats: privateProcedure.query(async ({ ctx }) => {
		const dbUser = await db.user.findFirst({
			where: {
				id: ctx.userId,
			},
		})

		if (!dbUser) {
			throw new TRPCError({ code: 'NOT_FOUND' })
		}

		const dbChats = await db.chat.findMany({
			where: {
				userId: dbUser.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return dbChats
	}),
})
