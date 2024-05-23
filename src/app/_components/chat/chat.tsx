'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { ComboboxForm } from '@/components/forms/combobox-form/combobox-form'
import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePostChatMessage } from '@/services/react-query/mutations/usePostChatMessage'

const chatFormSchema = z.object({
	message: z.string().min(1),
})

type ChatFormSchema = z.infer<typeof chatFormSchema>

export default function Page() {
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
	const { mutateAsync: postChatMessage, isPending: isPostingMessage } =
		usePostChatMessage()
	const router = useRouter()

	const form = useForm<ChatFormSchema>({
		resolver: zodResolver(chatFormSchema),
		shouldUseNativeValidation: false,
		defaultValues: {
			message: '',
		},
	})

	const onSubmit: SubmitHandler<ChatFormSchema> = async ({ message }) => {
		if (message.trim().length === 0) return
		const userMessage: ChatCompletionMessageParam = {
			role: 'user',
			content: message,
		}

		const newMessages: ChatCompletionMessageParam[] = [...messages, userMessage]

		try {
			const response = await postChatMessage(newMessages)

			const responseMessage: ChatCompletionMessageParam = {
				role: 'assistant',
				content: response.data,
			}

			setMessages((current) => [...current, userMessage, responseMessage])

			form.reset()
		} catch (err: unknown) {
			toast.error('Something went wrong')
		} finally {
			router.refresh()
		}
	}

	return (
		<Shell variant="default" className="max-h-[680vh] py-2 md:py-2">
			<Card className="flex h-full flex-col justify-between">
				<CardContent className="p-6">
					<div className="flex justify-end pb-2">
						<ComboboxForm />
					</div>

					<div className="space-y-4 overflow-y-auto">
						{messages.map((message) => {
							const id = uuid()

							return (
								<div
									key={id}
									className={cn(
										'flex w-max max-w-3xl flex-col gap-2 rounded-lg px-3 py-2 text-sm',
										message.role === 'user'
											? 'ml-auto bg-primary text-primary-foreground'
											: 'bg-muted',
									)}
								>
									{message.content}
								</div>
							)
						})}
					</div>
				</CardContent>
				<CardFooter>
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
											<Input
												placeholder="Enter your message"
												className="flex-1"
												autoComplete="off"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button type="submit" size="icon" disabled={isPostingMessage}>
								<PaperPlaneIcon className="h-4 w-4" />
								<span className="sr-only">Send</span>
							</Button>
						</form>
					</Form>
				</CardFooter>
			</Card>
		</Shell>
	)
}
