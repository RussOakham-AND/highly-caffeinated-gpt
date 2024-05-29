'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { UserRole } from '@/config/user-roles'
import { CreateChatInput, createChatSchema } from '@/schemas/chat'

import { RHCDevTool } from '../rhc-devtools'

interface RoleSelectFormProps {
	roles: UserRole[]
}

export function RoleSelectForm({ roles }: RoleSelectFormProps) {
	const router = useRouter()
	const initialRole = useSearchParams().get('role')

	const { mutate: createChatMutation, isPending } = trpc.createChat.useMutation(
		{
			onSuccess: ({ chatId, role }) => {
				router.push(`/chat/${chatId}?role=${role}`)
				toast.success(`You selected ${role}`)
			},
			onError: (error) => {
				toast.error(error.message)
			},
		},
	)

	const form = useForm<CreateChatInput>({
		shouldUseNativeValidation: false,
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			'user-role': initialRole ?? '',
		},
	})

	const onSubmit: SubmitHandler<CreateChatInput> = (data) => {
		createChatMutation(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="user-role"
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{roles.map((role) => (
										<SelectItem key={role.id} value={role.value}>
											{role.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{form.formState.errors['user-role'] ? (
								<div>
									<p className="text-sm text-red-500">
										{form.formState.errors['user-role'].message}
									</p>
								</div>
							) : null}
						</FormItem>
					)}
				/>

				<Button type="submit" variant="default" disabled={isPending}>
					Get Started
				</Button>
				<RHCDevTool control={form.control} />
			</form>
		</Form>
	)
}
