'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const emailSchema = z.object({
	email: z.union([
		z.string().trim().email({
			message: 'Please enter a valid email address',
		}),
		z.literal(''),
	]),
})

type Inputs = z.infer<typeof emailSchema>

export function NewsletterForm() {
	const [isPending, startTransition] = useTransition()

	const form = useForm<Inputs>({
		shouldUseNativeValidation: false,
		resolver: zodResolver(emailSchema),
	})

	function onSubmit(data: Inputs) {
		startTransition(() => {
			// eslint-disable-next-line no-console
			console.log(data)

			window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')

			toast.success('You have been rick rolled!')
			form.reset()
		})
	}

	return (
		<Form {...form}>
			<form
				className="grid w-full"
				onSubmit={form.handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="relative space-y-0">
							<FormLabel className="sr-only">Email</FormLabel>
							<FormControl>
								<Input
									placeholder="boliver.trask@and.digital"
									className="pr-12"
									{...field}
								/>
							</FormControl>
							<FormMessage />
							<Button
								className="absolute right-[3.5px] top-[4px] z-20 size-7"
								size="icon"
								variant="default"
								disabled={isPending}
							>
								{isPending ? (
									<Icons.Spinner
										className="size 3 animate-spin"
										aria-hidden="true"
									/>
								) : (
									<PaperPlaneIcon className="size-3" aria-hidden="true" />
								)}
							</Button>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
