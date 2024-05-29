import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

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
import { db } from '@/db'

export default async function Home() {
	const { getUser } = getKindeServerSession()

	const user = await getUser()

	const userId = user?.id

	if (!userId) redirect('/auth-callback?origin=chat')

	const dbUser = await db.user.findFirst({
		where: {
			id: userId,
		},
	})

	if (!dbUser) redirect('/auth-callback?origin=chat')

	// TODO: Select historic Chats - side drawer?

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
