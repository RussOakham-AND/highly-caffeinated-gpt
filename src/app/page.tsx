'use client'

import { useAuth } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

import Chat from './_components/chat/chat'
import { UserSelect } from './_components/user-select/userSelect'

export default function Home() {
	const role = useSearchParams().get('role')
	const { isSignedIn } = useAuth()

	if (role !== null && isSignedIn) {
		return <Chat />
	}

	return <UserSelect />
}
