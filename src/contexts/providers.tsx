'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import { env } from '@/env.mjs'

interface ProviderProps {
	readonly children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
					{children}
				</ClerkProvider>
			</ThemeProvider>
			<Toaster visibleToasts={1} richColors closeButton />
		</>
	)
}
