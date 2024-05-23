import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TRPCError } from '@trpc/server'

import { publicProcedure, router } from './trpc'

export const appRouter = router({
	authCallback: publicProcedure.query(async () => {
		const { getUser } = getKindeServerSession()

		const user = await getUser()

		if (!user?.id) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		// Check if user is in database

		return { success: true }
	}),
})

export type AppRouter = typeof appRouter
