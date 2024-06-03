import { appRouter } from '@/server/trpc/routers'
import { createCallerFactory } from '@/server/trpc/trpc'

export const createServerCaller = createCallerFactory(appRouter)

export const serverCaller = createServerCaller({})
