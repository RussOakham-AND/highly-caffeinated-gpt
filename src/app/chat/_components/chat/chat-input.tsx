'use client'

import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { z } from 'zod'

import { RHCDevTool } from '@/components/forms/rhc-devtools'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { ChatContext } from './chat-context'

const chatFormSchema = z.object({
	message: z.string().min(1),
})

type ChatFormSchema = z.infer<typeof chatFormSchema>

export const ChatInput = () => {
	const { addMessage, isLoading } = useContext(ChatContext)

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

		addMessage(userMessage)

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
					disabled={isLoading}
				>
					<PaperPlaneIcon className="h-4 w-4" />
					<span className="sr-only">Send</span>
				</Button>
				<RHCDevTool control={form.control} />
			</form>
		</Form>
	)
}
