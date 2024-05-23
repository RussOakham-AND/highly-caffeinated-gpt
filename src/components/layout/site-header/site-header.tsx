import {
	getKindeServerSession,
	LoginLink,
	LogoutLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRightIcon } from '@radix-ui/react-icons'

import { buttonVariants } from '@/components/ui/button'

import MainNav from '../navigation/main-nav'

export async function SiteHeader() {
	const { isAuthenticated } = getKindeServerSession()

	const isAuthed = await isAuthenticated()

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 max-w-6xl items-center">
				<MainNav />
				<div className="flex flex-1 items-center justify-end space-x-4">
					{isAuthed ? (
						<LogoutLink
							className={buttonVariants({
								variant: 'ghost',
							})}
						>
							Logout
						</LogoutLink>
					) : null}
					{!isAuthed ? (
						<>
							<LoginLink
								className={buttonVariants({
									variant: 'ghost',
								})}
							>
								Login
							</LoginLink>
							<RegisterLink className={buttonVariants({})}>
								Get Started
								<ArrowRightIcon className="ml-2 h-4 w-4" />
							</RegisterLink>
						</>
					) : null}
				</div>
			</div>
		</header>
	)
}
