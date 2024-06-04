'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { GoSidebarCollapse } from 'react-icons/go'
import { PulseLoader } from 'react-spinners'
import { useIntersection } from '@mantine/hooks'

import { trpc } from '@/app/_trpc/client'
import { ChatHistorySheet } from '@/components/chat-history-sheet'
import { ComboboxForm } from '@/components/forms/combobox-form/combobox-form'
import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { useReplyPendingStore } from '@/contexts/reply-pending-provider'
import { cn } from '@/lib/utils'

import Loading from '../loading'

import { ChatInput } from './chat-input'
import { Message } from './message'

interface ChatWrapperProps {
	chatId: string
}

export const ChatWrapper = ({ chatId }: ChatWrapperProps) => {
	const { isPending } = useReplyPendingStore((state) => state)
	const lastMessageRef = useRef<HTMLDivElement>(null)
	const scrollDivRef = useRef<HTMLDivElement>(null)
	const loadingRef = useRef<HTMLDivElement>(null)

	const {
		data: infiniteMessages,
		status,
		error: infiniteError,
		fetchNextPage,
	} = trpc.messages.getInfiniteChatMessages.useInfiniteQuery(
		{
			chatId,
			limit: 10,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	)

	const {
		data: chats,
		isFetching: isFetchingChats,
		isError: isErrorChats,
		isSuccess: isSuccessChats,
	} = trpc.chat.getAllChats.useQuery()

	const disableButton = isFetchingChats || isErrorChats || !isSuccessChats

	const { ref, entry } = useIntersection({
		root: lastMessageRef.current,
		threshold: 0.5,
	})

	useEffect(() => {
		if (entry?.isIntersecting) {
			fetchNextPage().catch(() => {
				// ignore
			})
		}
	}, [entry, fetchNextPage])

	useEffect(() => {
		if (status === 'success') {
			scrollDivRef.current?.scrollIntoView({ behavior: 'instant' })
		}
	}, [status])

	useLayoutEffect(() => {
		if (scrollDivRef.current && loadingRef.current) {
			scrollDivRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [isPending])

	if (status === 'pending') {
		return <Loading />
	}

	if (status === 'error') {
		throw new Error(infiniteError.message)
	}

	const flatMessages = infiniteMessages?.pages.flatMap((page) => page.messages)

	return (
		<Shell variant="default" className="px-2 py-2 md:px-8 md:py-2">
			<Card className="relative flex max-w-[95vw] flex-col justify-between gap-2">
				<CardContent className="p-2 md:p-6">
					<div className="flex justify-end pb-2">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									type="button"
									variant="secondary"
									className="mr-2"
									disabled={disableButton}
								>
									<GoSidebarCollapse />
								</Button>
							</SheetTrigger>
							{chats ? <ChatHistorySheet chats={chats} /> : null}
						</Sheet>
						<ComboboxForm chatId={chatId} />
					</div>
					<ScrollArea className="flex max-h-[65vh] flex-1 flex-col justify-between gap-2 pr-3">
						{flatMessages
							.map((message) => {
								const isLastMessage =
									flatMessages[flatMessages.length - 1].id === message.id
								return (
									<div key={message.id} ref={isLastMessage ? ref : undefined}>
										<Message message={message} />
									</div>
								)
							})
							.reverse()}
						{isPending ? (
							<div
								key="pending-id"
								ref={loadingRef}
								className={cn(
									'mx-3 my-2 flex w-max min-w-96 max-w-3xl flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm',
								)}
							>
								<PulseLoader
									className="h-5 items-center justify-center"
									size={12}
									color="rgb(220, 38, 38)"
								/>
							</div>
						) : null}
						<div ref={scrollDivRef} />
					</ScrollArea>
				</CardContent>
				<CardFooter>
					<ChatInput chatId={chatId} />
				</CardFooter>
			</Card>
		</Shell>
	)
}
