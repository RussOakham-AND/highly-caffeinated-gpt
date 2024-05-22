'use client'

import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { useUserRoleStore } from '@/contexts/user-role-provider'

import { RHCDevTool } from '../rhc-devtools'

interface RoleSelectFormProps {
	roles: UserRole[]
}

const formSchema = z.object({
	'user-role': z.string({
		required_error: 'Please select a role',
	}),
})

type FormValues = z.infer<typeof formSchema>

export function RoleSelectForm({ roles }: RoleSelectFormProps) {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const { role: initialRole, setRole } = useUserRoleStore((state) => state)

	const form = useForm<FormValues>({
		shouldUseNativeValidation: false,
		resolver: zodResolver(formSchema),
		defaultValues: {
			'user-role': initialRole?.value ?? '',
		},
	})

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		startTransition(() => {
			setRole(
				roles.find((role) => role.value === data['user-role']) as UserRole,
			)
			toast.success(`You selected ${data['user-role']}`)
			router.push('/chat')
		})
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
