'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { CommandList } from 'cmdk'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { UserRole, userRoles } from '@/config/user-roles'
import { cn } from '@/lib/utils'

interface ComboboxProps {
	initialValue?: UserRole
}

export function Combobox({ initialValue }: ComboboxProps) {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState<UserRole | null>(null)

	useEffect(() => {
		if (initialValue) {
			setValue(initialValue)
		}
	}, [initialValue])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value?.label ?? 'Select role...'}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Select role..." className="h-9" />
					<CommandEmpty>No roles</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{userRoles.map((role) => (
								<CommandItem
									key={role.value}
									value={role.value}
									onSelect={(currentValue) => {
										setValue(
											userRoles.find((r) => r.value === currentValue) ?? null,
										)
										setOpen(false)
									}}
								>
									{role.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											value === role ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
