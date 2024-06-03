import { router } from '../trpc'

import { authRouter } from './auth-router'
import { chatRouter } from './chat-router'
import { messagesRouter } from './messages-router'

export const appRouter = router({
	auth: authRouter,
	chat: chatRouter,
	messages: messagesRouter,
})

export type AppRouter = typeof appRouter
