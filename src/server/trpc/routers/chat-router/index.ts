import { TRPCError } from '@trpc/server'

import { db } from '@/db'
import { createChatSchema, getChatInfoSchema } from '@/schemas/chat'

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
