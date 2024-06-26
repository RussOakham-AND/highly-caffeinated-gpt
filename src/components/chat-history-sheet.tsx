import { Separator } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

import { Button } from './ui/button'
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from './ui/sheet'
import { ChatHistoryButton } from './chat-history-button'

export interface Chat {
	id: string
	userId: string
	createdAt: string
	updatedAt: string
}

interface ChatHistorySheetProps {
	chats: Chat[]
}

export const ChatHistorySheet = ({ chats }: ChatHistorySheetProps) => {
	return (
		<SheetContent side="left">
			<SheetHeader>
				<SheetTitle>Previous Chats</SheetTitle>
				<SheetDescription>
					Select a previous conversation to view or continue it.
				</SheetDescription>
			</SheetHeader>
			<Separator />
			<div className="grid gap-4 py-4">
				{chats.map((chat) => (
					<ChatHistoryButton key={chat.id} chat={chat} />
				))}
			</div>
			<SheetFooter>
				<SheetClose asChild>
					<Link href="/chat" passHref>
						<Button type="button" variant="default">
							New Chat
						</Button>
					</Link>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
	)
}
