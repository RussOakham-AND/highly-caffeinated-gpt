'use client'

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
	createUserRoleStore,
	type UserRoleStore,
} from '@/services/zustand/user-role-store'

export const UserRoleStoreContext =
	createContext<StoreApi<UserRoleStore> | null>(null)

export interface UserRoleStoreProviderProps {
	children: ReactNode
}

export const UserRoleStoreProvider = ({
	children,
}: UserRoleStoreProviderProps) => {
	const storeRef = useRef<StoreApi<UserRoleStore>>()
	if (!storeRef.current) {
		storeRef.current = createUserRoleStore()
	}

	return (
		<UserRoleStoreContext.Provider value={storeRef.current}>
			{children}
		</UserRoleStoreContext.Provider>
	)
}

export const useUserRoleStore = <T,>(
	selector: (store: UserRoleStore) => T,
): T => {
	const userRoleStoreContext = useContext(UserRoleStoreContext)

	if (!userRoleStoreContext) {
		throw new Error(`useUserRoleStore must be use within UserRoleStoreProvider`)
	}

	return useStore(userRoleStoreContext, selector)
}
