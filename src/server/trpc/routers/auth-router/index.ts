import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TRPCError } from '@trpc/server'

import { db } from '@/db'

import { publicProcedure, router } from '../../trpc'

export const authRouter = router({
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
})
