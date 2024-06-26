import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/server/trpc/routers'

// This function can run for a maximum of 5 seconds
export const maxDuration = 60

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: () => ({}),
	})

export { handler as GET, handler as POST }
