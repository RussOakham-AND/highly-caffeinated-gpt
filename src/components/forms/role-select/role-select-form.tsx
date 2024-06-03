'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { trpc } from '@/app/_trpc/client'
import { serverCaller } from '@/app/_trpc/server-client'
import { ChatHistorySheet } from '@/components/chat-history-sheet'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { UserRole } from '@/config/user-roles'
import { CreateChatInput, createChatSchema } from '@/schemas/chat'

import { RHCDevTool } from '../rhc-devtools'

interface RoleSelectFormProps {
	initialChats: Awaited<ReturnType<(typeof serverCaller.chat)['getAllChats']>>
	roles: UserRole[]
}

export function RoleSelectForm({ initialChats, roles }: RoleSelectFormProps) {
	const router = useRouter()
	const initialRole = useSearchParams().get('role')

	const formattedInitialRoles = initialChats.map((chat) => ({
		...chat,
		createdAt: chat.createdAt.toISOString(),
		updatedAt: chat.updatedAt.toISOString(),
	}))

	const {
		data: chats,
		isFetching,
		isError,
		isSuccess,
	} = trpc.chat.getAllChats.useQuery(undefined, {
		initialData: formattedInitialRoles,
		refetchOnMount: false,
		refetchOnReconnect: false,
	})

	const disableButton = isFetching || isError || !isSuccess

	const { mutate: createChatMutation, isPending } =
		trpc.chat.createChat.useMutation({
			onSuccess: ({ chatId, role }) => {
				router.push(`/chat/${chatId}?role=${role}`)
				toast.success(`You selected ${role}`)
			},
			onError: (error) => {
				toast.error(error.message)
			},
		})

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
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="mb-6 w-2/3">
					<FormField
						control={form.control}
						name="user-role"
						render={({ field }) => (
							<FormItem>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
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
				</div>

				<div className="flex w-full justify-between">
					<Button type="submit" variant="default" disabled={isPending}>
						Get Started
					</Button>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={disableButton}
							>
								Previous Chats
							</Button>
						</SheetTrigger>
						{chats ? <ChatHistorySheet chats={chats} /> : null}
					</Sheet>
				</div>
				<RHCDevTool control={form.control} />
			</form>
		</Form>
	)
}
