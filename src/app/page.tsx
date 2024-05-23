import {
	getKindeServerSession,
	LoginLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRightIcon } from '@radix-ui/react-icons'

import { RoleSelectForm } from '@/components/forms/role-select/role-select-form'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'
import { buttonVariants } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { userRoles } from '@/config/user-roles'

export default async function Home() {
	const { isAuthenticated } = getKindeServerSession()

	const isAuthorized = await isAuthenticated()

	if (!isAuthorized) {
		return (
			<Shell variant="centered">
				<Icons.LogoLarge className="size-28" />
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Sign in or sign up</CardTitle>
						<CardDescription>
							Sign in or sign up to Swiss ANDi Knife to get started. You can
							choose your role after you sign in.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-evenly">
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
						</div>
					</CardContent>
				</Card>
			</Shell>
		)
	}

	return (
		<Shell variant="centered">
			<Icons.LogoLarge className="size-28" />
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Who are you?</CardTitle>
					<CardDescription>
						Select your role so Swiss ANDi knife can customise its responses for
						you. You can change this later.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RoleSelectForm roles={userRoles} />
				</CardContent>
			</Card>
		</Shell>
	)
}
