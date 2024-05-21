import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Shell } from '@/components/layout/shells/shell'
import { SiteFooter } from '@/components/layout/site-footer/site-footer'
import { SiteHeader } from '@/components/layout/site-header/site-header'
import { cn } from '@/lib/utils'

import './globals.css'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
	title: 'Highly Caffeinated AND-GPT',
	description: "We don't know what this is",
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
			>
				<div className="relative flex min-h-screen flex-col">
					<SiteHeader />
					<main className="flex-1">
						<Shell variant="zero-vertical-padding" className="max-w-6xl">
							{children}
						</Shell>
					</main>
					<SiteFooter />
				</div>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
