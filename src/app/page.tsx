import { RoleSelectForm } from '@/components/forms/role-select/role-select-form'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { userRoles } from '@/config/user-roles'

export default function Home() {
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
