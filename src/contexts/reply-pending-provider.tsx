'use client'

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
	createReplyPendingStore,
	type ReplyPendingStore,
} from '@/services/zustand/reply-pending'

export const ReplyPendingStoreContext =
	createContext<StoreApi<ReplyPendingStore> | null>(null)

export interface ReplyPendingProviderProps {
	children: ReactNode
}

export const ReplyPendingStoreProvider = ({
	children,
}: ReplyPendingProviderProps) => {
	const storeRef = useRef<StoreApi<ReplyPendingStore>>()
	if (!storeRef.current) {
		storeRef.current = createReplyPendingStore()
	}

	return (
		<ReplyPendingStoreContext.Provider value={storeRef.current}>
			{children}
		</ReplyPendingStoreContext.Provider>
	)
}

export const useReplyPendingStore = <T,>(
	selector: (store: ReplyPendingStore) => T,
): T => {
	const replyPendingStoreContext = useContext(ReplyPendingStoreContext)

	if (!replyPendingStoreContext) {
		throw new Error(
			`useReplyPendingStore must be use within ReplyPendingStoreProvider`,
		)
	}

	return useStore(replyPendingStoreContext, selector)
}
