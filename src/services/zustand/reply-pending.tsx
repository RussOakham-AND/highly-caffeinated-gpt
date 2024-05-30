import { createStore } from 'zustand'

export type ReplyPendingState = {
	isPending: boolean
}

export type ReplyPendingStoreActions = {
	setIsPending: (isPending: boolean) => void
}

export type ReplyPendingStore = ReplyPendingState & ReplyPendingStoreActions

export const defaultInitState: ReplyPendingState = {
	isPending: false,
}

export const createReplyPendingStore = (
	initState: ReplyPendingState = defaultInitState,
) => {
	return createStore<ReplyPendingStore>()((set) => ({
		...initState,
		setIsPending: (isPending: boolean) => set({ isPending }),
	}))
}
