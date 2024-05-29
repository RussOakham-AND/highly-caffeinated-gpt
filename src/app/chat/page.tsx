import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import { db } from '@/db'

import { ChatWrapper } from './_components/chat/chat-wrapper'

export default async function Home() {
	const { getUser } = getKindeServerSession()

	const user = await getUser()

	if (!user?.id) redirect('/auth-callback?origin=chat')

	const dbUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	})

	if (!dbUser) redirect('/auth-callback?origin=chat')

	return <ChatWrapper />
}
