'use client'

import { GoSidebarCollapse } from 'react-icons/go'
import { PulseLoader } from 'react-spinners'

import { trpc } from '@/app/_trpc/client'
import { ChatHistorySheet } from '@/components/chat-history-sheet'
import { ComboboxForm } from '@/components/forms/combobox-form/combobox-form'
import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
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
	const {
		data: messages,
		isFetching,
		isError,
		error,
		isSuccess,
	} = trpc.messages.getChatMessages.useQuery({ chatId })
	const { isPending } = useReplyPendingStore((state) => state)

	const {
		data: chats,
		isFetching: isFetchingChats,
		isError: isErrorChats,
		isSuccess: isSuccessChats,
	} = trpc.chat.getAllChats.useQuery()

	const disableButton = isFetchingChats || isErrorChats || !isSuccessChats

	if (isFetching && !messages) {
		return <Loading />
	}

	if (isError || !isSuccess) {
		throw new Error(error?.message)
	}

	return (
		<Shell variant="default" className="py-2 md:py-2">
			<Card className="relative flex min-h-full flex-col justify-between gap-2">
				<CardContent className="p-6">
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
					<div className="mb-28 flex flex-1 flex-col justify-between gap-2">
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
						{isPending ? (
							<div
								key="temp-id"
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
					</div>
				</CardContent>
				<CardFooter>
					<ChatInput chatId={chatId} />
				</CardFooter>
			</Card>
		</Shell>
	)
}
