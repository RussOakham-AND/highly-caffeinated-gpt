'use client'

import { ComboboxForm } from '@/components/forms/combobox-form/combobox-form'
import { Shell } from '@/components/layout/shells/shell'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { ChatContextProvider } from './chat-context'
import { ChatInput } from './chat-input'
import { Messages } from './messages'

export const ChatWrapper = () => {
	return (
		<ChatContextProvider>
			<Shell variant="default" className="max-h-[90vh] py-2 md:py-2">
				<Card className="relative flex min-h-full flex-col justify-between gap-2">
					<CardContent className="p-6">
						<div className="flex justify-end pb-2">
							<ComboboxForm />
						</div>
						<div className="mb-28 flex flex-1 flex-col justify-between">
							<Messages />
						</div>
					</CardContent>
					<CardFooter>
						<ChatInput />
					</CardFooter>
				</Card>
			</Shell>
		</ChatContextProvider>
	)
}
