import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

import MainNav from '../navigation/main-nav'

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 max-w-6xl items-center">
				<MainNav />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<SignedOut>
						<SignInButton mode="modal">
							<Button variant="secondary" type="button">
								Login
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	)
}
