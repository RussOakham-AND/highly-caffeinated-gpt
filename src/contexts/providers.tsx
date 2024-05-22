'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

import { ReactQueryProvider } from './react-query-provider'
import { UserRoleStoreProvider } from './user-role-provider'

interface ProviderProps {
	readonly children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<ClerkProvider>
					<ReactQueryProvider>
						<UserRoleStoreProvider>{children}</UserRoleStoreProvider>
					</ReactQueryProvider>
				</ClerkProvider>
			</ThemeProvider>
			<Toaster visibleToasts={1} richColors closeButton />
		</>
	)
}
