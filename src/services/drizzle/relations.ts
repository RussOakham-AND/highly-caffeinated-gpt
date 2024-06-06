import { relations } from 'drizzle-orm/relations'

import { Chat, Message, User } from './schema'

export const ChatRelations = relations(Chat, ({ one, many }) => ({
	User: one(User, {
		fields: [Chat.userId],
		references: [User.id],
	}),
	Messages: many(Message),
}))

export const UserRelations = relations(User, ({ many }) => ({
	Chats: many(Chat),
}))

export const MessageRelations = relations(Message, ({ one }) => ({
	Chat: one(Chat, {
		fields: [Message.chatId],
		references: [Chat.id],
	}),
}))
