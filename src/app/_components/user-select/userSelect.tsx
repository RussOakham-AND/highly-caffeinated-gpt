import {
	ClerkLoading,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
} from '@clerk/nextjs'

import { RoleSelectForm } from '@/components/forms/role-select/role-select-form'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { userRoles } from '@/config/user-roles'

export function UserSelect() {
	return (
		<Shell variant="centered">
			<Icons.LogoLarge className="size-28" />
			<Card className="w-[350px]">
				<ClerkLoading>
					<Shell variant="centered">
						<Icons.Spinner className="size-36 text-red-500" />
					</Shell>
				</ClerkLoading>
				<SignedIn>
					<CardHeader>
						<CardTitle>Who are you?</CardTitle>
						<CardDescription>
							Select your role so Swiss ANDi knife can customise its responses
							for you. You can change this later.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RoleSelectForm roles={userRoles} />
					</CardContent>
				</SignedIn>
				<SignedOut>
					<CardHeader>
						<CardTitle>Sign in or sign up</CardTitle>
						<CardDescription>
							Sign in or sign up to Swiss ANDi Knife to get started. You can
							choose your role after you sign in.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-evenly">
							<ClerkLoading>
								<Icons.Spinner className="size-10 text-red-500" />
							</ClerkLoading>
							<SignInButton mode="modal">
								<Button variant="secondary" type="button">
									Login
								</Button>
							</SignInButton>
							<SignUpButton mode="modal">
								<Button variant="default" type="button">
									Sign Up
								</Button>
							</SignUpButton>
						</div>
					</CardContent>
				</SignedOut>
			</Card>
		</Shell>
	)
}
