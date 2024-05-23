'use client'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useSearchParams } from 'next/navigation'

import Chat from './_components/chat/chat'
import { UserSelect } from './_components/user-select/userSelect'

export default function Home() {
	const { isAuthenticated } = useKindeBrowserClient()
	const role = useSearchParams().get('role')

	if (role !== null && isAuthenticated) {
		return <Chat />
	}

	return <UserSelect />
}
