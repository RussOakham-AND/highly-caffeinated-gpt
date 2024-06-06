import {
	boolean,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from 'drizzle-orm/pg-core'

export const User = pgTable(
	'User',
	{
		id: text('id').primaryKey().notNull(),
		email: text('email').notNull(),
		firstName: text('firstName'),
		lastName: text('lastName'),
	},
	(table) => {
		return {
			email_key: uniqueIndex('User_email_key').using('btree', table.email),
			id_key: uniqueIndex('User_id_key').using('btree', table.id),
		}
	},
)

export const Chat = pgTable('Chat', {
	id: text('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
	userId: text('userId')
		.notNull()
		.references(() => User.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const Message = pgTable('Message', {
	id: text('id').primaryKey().notNull(),
	text: text('text').notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
	isUserMessage: boolean('isUserMessage').notNull(),
	chatId: text('chatId').references(() => Chat.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	role: text('role').notNull(),
})
