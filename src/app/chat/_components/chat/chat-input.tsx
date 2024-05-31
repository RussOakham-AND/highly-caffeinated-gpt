'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Message } from '@prisma/client'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { z } from 'zod'

import { trpc } from '@/app/_trpc/client'
import { RHCDevTool } from '@/components/forms/rhc-devtools'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useReplyPendingStore } from '@/contexts/reply-pending-provider'

const chatFormSchema = z.object({
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
	const { setIsPending } = useReplyPendingStore((state) => state)
	const utils = trpc.useUtils()

	const { mutate: postMessageMutation, isPending } =
		trpc.postChatMessage.useMutation({
			onMutate: async ({ message }) => {
				setIsPending(true)
				await utils.getChatMessages.cancel({ chatId })

				const previousMessages = utils.getChatMessages.getData({ chatId })

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

				utils.getChatMessages.setData({ chatId }, optimisticMessages)

				return { previousMessages }
			},
			onError: (error, variables, context) => {
				if (context?.previousMessages) {
					utils.getChatMessages.setData({ chatId }, context.previousMessages)
				}
				toast.error(error.message)
			},
			onSettled: async () => {
				await utils.getChatMessages.invalidate({ chatId })
				setIsPending(false)
			},
		})

	const form = useForm<ChatFormSchema>({
		resolver: zodResolver(chatFormSchema),
		shouldUseNativeValidation: false,
		defaultValues: {
			message: '',
		},
	})

	const onSubmit: SubmitHandler<ChatFormSchema> = ({
		message: inputMessage,
	}) => {
		if (inputMessage.trim().length === 0) return

		const userMessage = {
			role: 'user',
			content: inputMessage,
		}

		postMessageMutation({
			chatId,
			message: [userMessage],
		})

		form.reset()
		form.setFocus('message')
	}

	return (
		<Form {...form}>
			<form
				className="flex w-full items-center space-x-2"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					name="message"
					control={form.control}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Textarea
									{...field}
									placeholder="Enter your query"
									rows={1}
									maxRows={4}
									autoFocus
									autoComplete="off"
									value={field.value}
									className="resize-none pr-12 text-base"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					size="icon"
					aria-label="send message"
					disabled={isPending}
				>
					<PaperPlaneIcon className="h-4 w-4" />
					<span className="sr-only">Send</span>
				</Button>
				<RHCDevTool control={form.control} />
			</form>
		</Form>
	)
}
