'use client'

import { PulseLoader } from 'react-spinners'

import { trpc } from '@/app/_trpc/client'
import { ComboboxForm } from '@/components/forms/combobox-form/combobox-form'
import { Shell } from '@/components/layout/shells/shell'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useReplyPendingStore } from '@/contexts/reply-pending-provider'
import { cn } from '@/lib/utils'

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
	} = trpc.getChatMessages.useQuery({ chatId })
	const { isPending } = useReplyPendingStore((state) => state)

	if (isFetching && !messages) {
		return <div>Loading...</div>
	}

	if (isError || !isSuccess) {
		return <div>Error: {error?.message}</div>
	}

	return (
		<Shell variant="default" className="py-2 md:py-2">
			<Card className="relative flex min-h-full flex-col justify-between gap-2">
				<CardContent className="p-6">
					<div className="flex justify-end pb-2">
						<ComboboxForm />
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
