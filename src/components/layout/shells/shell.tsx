import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const shellVariants = cva('grid items-center gap-8 pb-8 pt-6 md:py-8', {
	variants: {
		variant: {
			default: 'container',
			sidebar: '',
			'centered-horizontal':
				'container flex h-[100dvh] max-w-2xl flex-col justify-center',
			'v-centered': 'container flex items-center h-inherit',
			centered: 'container flex flex-col justify-center items-center h-inherit',
			markdown: 'container max-w-3xl py-8 md:py-10 lg:py-10',
			'zero-vertical-padding': 'container py-0 md:py-0 lg:py-0',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

interface ShellProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof shellVariants> {
	as?: React.ElementType
}

function Shell({
	className,
	as: Comp = 'section',
	variant,
	...props
}: ShellProps) {
	return (
		<Comp className={cn(shellVariants({ variant }), className)} {...props} />
	)
}

export { Shell, shellVariants }
