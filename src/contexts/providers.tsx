'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

import { UserRoleStoreProvider } from './user-role-provider'

interface ProviderProps {
	readonly children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<ClerkProvider>
					<UserRoleStoreProvider>{children}</UserRoleStoreProvider>
				</ClerkProvider>
			</ThemeProvider>
			<Toaster visibleToasts={1} richColors closeButton />
		</>
	)
}
