import MainNav from '../navigation/main-nav'

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 max-w-6xl items-center">
				<MainNav />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-2">Login</nav>
				</div>
			</div>
		</header>
	)
}
