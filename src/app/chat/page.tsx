import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import { Chat } from './_components/chat/chat'

export default async function Home() {
	const { getUser } = getKindeServerSession()

	const user = await getUser()

	if (!user?.id) redirect('/auth-callback?origin=chat')

	return <Chat />
}
