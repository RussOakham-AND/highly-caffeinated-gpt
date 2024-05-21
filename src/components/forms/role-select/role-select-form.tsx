'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

import { RHCDevTool } from '../rhc-devtools'

interface RoleSelectFormProps {
	roles: string[]
}

const formSchema = z.object({
	'user-role': z.string({
		required_error: 'Please select a role',
	}),
})

type FormValues = z.infer<typeof formSchema>

export function RoleSelectForm({ roles }: RoleSelectFormProps) {
	const form = useForm<FormValues>({
		shouldUseNativeValidation: false,
		resolver: zodResolver(formSchema),
	})

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		toast.success(`You selected ${data['user-role']}`)
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
										<SelectItem key={role} value={role}>
											{role}
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

				<Button type="submit" variant="default">
					Get Started
				</Button>
				<RHCDevTool control={form.control} />
			</form>
		</Form>
	)
}
