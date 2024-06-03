import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.create()
const { middleware } = t

const isAuth = middleware(async (opts) => {
	const { getUser } = getKindeServerSession()

	const user = await getUser()

	const userId = user?.id

	if (!userId) {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}

	return opts.next({
		ctx: {
			userId,
			user,
		},
	})
})

export const { router, createCallerFactory } = t
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
