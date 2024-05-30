'use client'

import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

import { ReplyPendingStoreProvider } from './reply-pending-provider'
import { TRPCProvider } from './trpc-provider'

interface ProviderProps {
	readonly children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<TRPCProvider>
					<ReplyPendingStoreProvider>{children}</ReplyPendingStoreProvider>
				</TRPCProvider>
			</ThemeProvider>
			<Toaster visibleToasts={1} richColors closeButton />
		</>
	)
}
