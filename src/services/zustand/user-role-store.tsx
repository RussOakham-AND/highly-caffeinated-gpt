import { createStore } from 'zustand'

import { UserRole } from '@/config/user-roles'

export type UserRoleState = {
	role: UserRole | null
}

export type UserRoleStoreActions = {
	setRole: (role: UserRole) => void
}

export type UserRoleStore = UserRoleState & UserRoleStoreActions

export const defaultInitState: UserRoleState = {
	role: null,
}

export const createUserRoleStore = (
	initState: UserRoleState = defaultInitState,
) => {
	return createStore<UserRoleStore>()((set) => ({
		...initState,
		setRole: (role: UserRole) => set({ role }),
	}))
}
