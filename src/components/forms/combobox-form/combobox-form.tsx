'use client'

import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { CommandList } from 'cmdk'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { userRoles } from '@/config/user-roles'
import { cn } from '@/lib/utils'

const inputsSchema = z.object({
	role: z.string().nullish(),
})

type Inputs = z.infer<typeof inputsSchema>

export function ComboboxForm() {
	const [open, setOpen] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)
	const router = useRouter()

	const roleParam = useSearchParams().get('role')
	const selectedRole = userRoles.find((role) => role.value === roleParam)

	const form = useForm<Inputs>({
		shouldUseNativeValidation: false,
		resolver: zodResolver(inputsSchema),
		defaultValues: {
			role: roleParam,
		},
	})

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		router.push(`/?role=${data.role}`)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				ref={formRef}
			>
				<FormField
					name="role"
					control={form.control}
					render={({ field }) => (
						<FormItem className="flex flex-col ">
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												'w-[200px] justify-between',
												!field.value && 'text-muted-foreground',
											)}
										>
											{userRoles.find((role) => role.value === field.value)
												?.label ?? 'Select role...'}
											<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput
											placeholder="Select role..."
											className="h-9"
										/>
										<CommandEmpty>No roles</CommandEmpty>
										<CommandGroup>
											<CommandList>
												{userRoles.map((role) => (
													<CommandItem
														key={role.value}
														value={role.value}
														onSelect={() => {
															form.setValue('role', role.value)
															setOpen(false)
															if (formRef.current) {
																formRef.current.requestSubmit()
															}
														}}
													>
														{role.label}
														<CheckIcon
															className={cn(
																'ml-auto h-4 w-4',
																selectedRole === field.value
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
													</CommandItem>
												))}
											</CommandList>
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
