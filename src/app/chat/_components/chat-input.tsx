'use client'

import { useRef, useState } from 'react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useReplyPendingStore } from '@/contexts/reply-pending-provider'
import { ChatMessage } from '@/schemas/chat'

interface ChatInputProps {
	chatId: string
}

export const ChatInput = ({ chatId }: ChatInputProps) => {
	const [inputMessage, setInputMessage] = useState<ChatMessage>({
		role: 'user',
		content: '',
	})
	const { isPending, setIsPending } = useReplyPendingStore((state) => state)
	const utils = trpc.useUtils()

	const { mutate: postMessageMutation } =
		trpc.messages.postChatMessage.useMutation({
			onMutate: async ({ message }) => {
				setIsPending(true)
				await utils.messages.getInfiniteChatMessages.cancel({ chatId })

				const previousMessages =
					utils.messages.getInfiniteChatMessages.getInfiniteData({
						chatId,
						limit: 10,
					})

				utils.messages.getInfiniteChatMessages.setInfiniteData(
					{
						chatId,
						limit: 10,
					},
					(previousData) => {
						if (!previousData) {
							return {
								pages: [],
								pageParams: [],
							}
						}

						const optimisticUpdate = {
							pages: [
								{
									messages: [
										...message.map((msg) => ({
											...msg,
											createdAt: new Date().toISOString(),
											chatId,
											id: 'temp-id',
											updatedAt: new Date().toISOString(),
											text: msg.content,
											isUserMessage: true,
										})),
									],
								},
								...previousData.pages,
							],
							pageParams: previousData.pageParams,
						}

						return optimisticUpdate
					},
				)

				return {
					previousMessages:
						previousMessages?.pages.flatMap((page) => page.messages) ?? [],
				}
			},
			onError: (error, _, context) => {
				if (context?.previousMessages) {
					utils.messages.getInfiniteChatMessages.setData(
						{ chatId },
						{
							messages: context.previousMessages ?? [],
						},
					)
				}
				toast.error(error.message)
			},
			onSettled: async () => {
				await utils.messages.getInfiniteChatMessages.invalidate({ chatId })
				setIsPending(false)
			},
		})

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const submitMessage = () => {
		if (inputMessage.content === '') return

		const { role, content } = inputMessage

		postMessageMutation({
			chatId,
			message: [{ role, content }],
		})

		setInputMessage({
			role: 'user',
			content: '',
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
					value={inputMessage?.content}
					className="w-full resize-none pr-12 text-base"
					onChange={(e) => {
						const content = e.target.value

						setInputMessage({
							role: 'user',
							content,
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
