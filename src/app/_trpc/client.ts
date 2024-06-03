import { createTRPCReact } from '@trpc/react-query'

import { AppRouter } from '@/server/trpc/routers'

export const trpc = createTRPCReact<AppRouter>({})
