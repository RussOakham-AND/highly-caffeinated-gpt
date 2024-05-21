import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { SiteFooter } from '@/components/layout/site-footer/site-footer'
import { SiteHeader } from '@/components/layout/site-header/site-header'
import { Providers } from '@/contexts/providers'
import { cn } from '@/lib/utils'

import './globals.css'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
	title: 'Swiss ANDi Knife',
	description:
		"A GPT powered Swiss Army Knife for ANDis. It's a tool that can do anything you want it to do (eventually...)",
}

interface LayoutProps {
	readonly children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en-GB">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
				suppressHydrationWarning
			>
				<Providers>
					<div className="relative flex min-h-screen flex-col">
						<SiteHeader />
						<main className="m-auto flex w-full max-w-6xl flex-1">
							{children}
						</main>
						<SiteFooter />
					</div>
					<Analytics />
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	)
}
