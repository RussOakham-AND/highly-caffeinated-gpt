'use client'

import { trpc } from '@/app/_trpc/client'
import { ComboboxForm } from '@/components/forms/combobox-form/combobox-form'
import { Shell } from '@/components/layout/shells/shell'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { ChatContextProvider } from './chat-context'
import { ChatInput } from './chat-input'
import { Messages } from './messages'

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

	if (isFetching && !messages) {
		return <div>Loading...</div>
	}

	if (isError || !isSuccess) {
		return <div>Error: {error?.message}</div>
	}

	console.log(messages)

	return (
		<ChatContextProvider>
			<Shell variant="default" className="max-h-[90vh] py-2 md:py-2">
				<Card className="relative flex min-h-full flex-col justify-between gap-2">
					<CardContent className="p-6">
						<div className="flex justify-end pb-2">
							<ComboboxForm />
						</div>
						<div className="mb-28 flex flex-1 flex-col justify-between">
							<Messages messages={messages} />
						</div>
					</CardContent>
					<CardFooter>
						<ChatInput chatId={chatId} />
					</CardFooter>
				</Card>
			</Shell>
		</ChatContextProvider>
	)
}
