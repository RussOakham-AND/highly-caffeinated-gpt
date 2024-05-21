'use client'

import Link from 'next/link'

import { Icons } from '@/components/icons'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export default function MainNav() {
	return (
		<div className="hidden gap-6 lg:flex">
			<Link href="/" className="hidden items-center space-x-2 lg:flex">
				<Icons.Logo className="size-6" aria-hidden="true" />
				<span className="sr-only">Home</span>
			</Link>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
