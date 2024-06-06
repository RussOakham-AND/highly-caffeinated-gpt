import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { eq } from 'drizzle-orm'
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
import { db as drizzDB } from '@/services/drizzle/db'
import { User } from '@/services/drizzle/schema'

import { serverCaller } from '../_trpc/server-client'

export default async function Chat() {
	const { getUser } = getKindeServerSession()

	const user = await getUser()

	const userId = user?.id

	if (!userId) redirect('/auth-callback?origin=chat')

	const dbUser = await db.user.findFirst({
		where: {
			id: userId,
		},
	})

	// Refactor DB queries into separate file to be reusable.
	const drizzDbUser = await drizzDB
		.select({
			user: User,
		})
		.from(User)
		.where(eq(User.id, userId))

	console.log('dbUser', dbUser)
	console.log('drizzDbUser', drizzDbUser)

	if (!dbUser) redirect('/auth-callback?origin=chat')

	const chats = await serverCaller.chat.getAllChats()

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
					<RoleSelectForm initialChats={chats} roles={userRoles} />
				</CardContent>
			</Card>
		</Shell>
	)
}
