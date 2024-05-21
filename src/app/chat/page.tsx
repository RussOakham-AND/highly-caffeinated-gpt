'use client'

import { useState } from 'react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function Page() {
	const [messages, setMessages] = useState([
		{
			id: 1,
			role: 'agent',
			content: 'Hi, how can I help you today?',
		},
		{
			id: 2,
			role: 'user',
			content: "Hey, I'm having trouble with my account.",
		},
		{
			id: 3,
			role: 'agent',
			content: 'What seems to be the problem?',
		},
		{
			id: 4,
			role: 'user',
			content: "I can't log in.",
		},
	])
	const [input, setInput] = useState('')
	const inputLength = input.trim().length

	return (
		<Shell variant="default" className="py-2 md:py-2">
			<Card className="flex h-full flex-col justify-between">
				<CardContent className="p-6">
					<div className="space-y-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={cn(
									'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
									message.role === 'user'
										? 'ml-auto bg-primary text-primary-foreground'
										: 'bg-muted',
								)}
							>
								{message.content}
							</div>
						))}
					</div>
				</CardContent>
				<CardFooter>
					<form
						className="flex w-full items-center space-x-2"
						onSubmit={(event) => {
							event.preventDefault()
							if (inputLength === 0) return
							setMessages([
								...messages,
								{
									id: messages.length + 1,
									role: 'user',
									content: input,
								},
							])
							setInput('')
						}}
					>
						<Input
							id="message"
							placeholder="Type your message..."
							className="flex-1"
							autoComplete="off"
							value={input}
							onChange={(event) => setInput(event.target.value)}
						/>
						<Button type="submit" size="icon" disabled={inputLength === 0}>
							<PaperPlaneIcon className="h-4 w-4" />
							<span className="sr-only">Send</span>
						</Button>
					</form>
				</CardFooter>
			</Card>
		</Shell>
	)
}
