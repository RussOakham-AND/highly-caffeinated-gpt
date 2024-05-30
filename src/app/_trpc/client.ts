import { createTRPCReact } from '@trpc/react-query'

import { AppRouter } from '@/trpc'

// This function can run for a maximum of 5 seconds
export const config = {
	maxDuration: 60,
}

export const trpc = createTRPCReact<AppRouter>({})
