'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { httpBatchLink } from '@trpc/react-query'

import { trpc } from '@/app/_trpc/client'
import { absoluteUrl } from '@/lib/utils'

export const TRPCProvider = ({ children }: PropsWithChildren) => {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: absoluteUrl('/api/trpc'),
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryStreamedHydration>
					{children}
					<ReactQueryDevtools
						initialIsOpen={false}
						buttonPosition="bottom-left"
					/>
				</ReactQueryStreamedHydration>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
