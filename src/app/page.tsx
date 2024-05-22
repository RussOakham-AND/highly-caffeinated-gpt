'use client'

import { useAuth } from '@clerk/nextjs'

import { useUserRoleStore } from '@/contexts/user-role-provider'

import Chat from './_components/chat/chat'
import { UserSelect } from './_components/user-select/userSelect'

export default function Home() {
	const { role } = useUserRoleStore((state) => state)
	const { isSignedIn } = useAuth()

	if (role !== null && isSignedIn) {
		return <Chat />
	}

	return <UserSelect />
}
