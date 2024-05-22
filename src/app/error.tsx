'use client'

import { useEffect } from 'react'

import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<Shell variant="centered">
			<Icons.LogoLarge className="size-28" />
			<Card className="w-[350px]">
				<CardHeader className="text-center">
					<CardTitle>Oops! Something went wrong..</CardTitle>
					<CardDescription>
						{error.message ?? 'An error occurred'}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-evenly">
					<Button
						type="button"
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset()
						}
					>
						Try again
					</Button>

					<Button
						type="button"
						variant="outline"
						onClick={() => {
							window.location.reload()
						}}
					>
						Home
					</Button>
				</CardContent>
			</Card>
		</Shell>
	)
}
