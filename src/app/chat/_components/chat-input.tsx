'use client'

import { useRef, useState } from 'react'
import { Message } from '@prisma/client'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { z } from 'zod'

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useReplyPendingStore } from '@/contexts/reply-pending-provider'

const chatFormSchema = z.object({
	role: z.string().min(1),
	message: z.string().min(1),
})

type ChatFormSchema = z.infer<typeof chatFormSchema>

interface ChatInputProps {
	chatId: string
}

interface OptimisticMessage extends Omit<Message, 'createdAt' | 'updatedAt'> {
	createdAt: string
	updatedAt: string
}

export const ChatInput = ({ chatId }: ChatInputProps) => {
	const [inputMessage, setInputMessage] = useState<ChatFormSchema>({
		role: 'user',
		message: '',
	})
	const { isPending, setIsPending } = useReplyPendingStore((state) => state)
	const utils = trpc.useUtils()

	const { mutate: postMessageMutation } =
		trpc.messages.postChatMessage.useMutation({
			onMutate: async ({ message }) => {
				setIsPending(true)
				await utils.messages.getChatMessages.cancel({ chatId })

				const previousMessages = utils.messages.getChatMessages.getData({
					chatId,
				})

				if (!previousMessages) return { previousMessages: [] }

				const optimisticMessages: OptimisticMessage[] = [
					...previousMessages,
					{
						id: message[message.length - 1].role,
						text: message[message.length - 1].content,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						isUserMessage: true,
						role: 'user',
						chatId,
					},
				]

				utils.messages.getChatMessages.setData({ chatId }, optimisticMessages)

				return { previousMessages }
			},
			onError: (error, variables, context) => {
				if (context?.previousMessages) {
					utils.messages.getChatMessages.setData(
						{ chatId },
						context.previousMessages,
					)
				}
				toast.error(error.message)
			},
			onSettled: async () => {
				await utils.messages.getChatMessages.invalidate({ chatId })
				await utils.messages.getInfiniteChatMessages.invalidate({ chatId })
				setIsPending(false)
			},
		})

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const submitMessage = () => {
		if (inputMessage.message === '') return

		const { role, message } = inputMessage

		postMessageMutation({
			chatId,
			message: [{ role, content: message }],
		})

		setInputMessage({
			role: 'user',
			message: '',
		})
		textareaRef.current?.focus()
	}

	return (
		<div className="flex w-full items-center space-x-2">
			<div className="w-full">
				<Textarea
					ref={textareaRef}
					placeholder="Enter your query"
					rows={1}
					maxRows={4}
					autoFocus
					autoComplete="off"
					value={inputMessage?.message}
					className="w-full resize-none pr-12 text-base"
					onChange={(e) => {
						const message = e.target.value

						setInputMessage({
							role: 'user',
							message,
						})
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()

							submitMessage()
						}
					}}
				/>
			</div>

			<Button
				type="submit"
				size="icon"
				aria-label="send message"
				disabled={isPending}
				onClick={() => {
					submitMessage()
				}}
			>
				<PaperPlaneIcon className="h-4 w-4" />
				<span className="sr-only">Send</span>
			</Button>
		</div>
	)
}
