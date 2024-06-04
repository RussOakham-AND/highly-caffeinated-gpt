'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

import { CSPostHogProvider } from './posthog-provider'
import { ReplyPendingStoreProvider } from './reply-pending-provider'
import { TRPCProvider } from './trpc-provider'

const PostHogPageView = dynamic(
	() => import('@/services/posthog/posthog-page-view'),
	{
		ssr: false,
	},
)
interface ProviderProps {
	readonly children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
	return (
		<CSPostHogProvider>
			<PostHogPageView />
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<TRPCProvider>
					<ReplyPendingStoreProvider>{children}</ReplyPendingStoreProvider>
				</TRPCProvider>
			</ThemeProvider>
			<Toaster visibleToasts={1} richColors closeButton />
		</CSPostHogProvider>
	)
}
