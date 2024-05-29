import { cn } from '@/lib/utils'

interface ChatResponseBody {
	id: string
	text: string
	createdAt: string
	updatedAt: string
	isUserMessage: boolean
	role: string
	chatId: string | null
}

interface MessagesProps {
	message: ChatResponseBody
}

export const Message = ({ message }: MessagesProps) => {
	return (
		<div className="flex flex-col gap-1 px-3 py-2">
			<div
				key={message.id}
				className={cn(
					'flex w-max max-w-3xl flex-col gap-2 rounded-lg px-3 py-2 text-sm',
					message.role === 'user'
						? 'ml-auto bg-primary text-primary-foreground'
						: 'bg-muted',
				)}
			>
				{message.text}
			</div>
			<span
				className={cn(
					'w-max px-1 text-xs text-muted-foreground',
					message.role === 'user' ? 'ml-auto' : '',
				)}
			>
				{new Date(message.createdAt).toLocaleString()}
			</span>
		</div>
	)
}
