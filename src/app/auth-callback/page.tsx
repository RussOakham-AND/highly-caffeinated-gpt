'use client'

import { PuffLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function Page() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const origin = searchParams.get('origin')

	return (
		<Shell variant="centered">
			<Icons.LogoLarge className="size-28" />
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Please stand by...</CardTitle>
					<CardDescription>
						We&apos;re just setting up your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Shell variant="centered" className="min-h-36">
						<PuffLoader color="red" />
					</Shell>
				</CardContent>
			</Card>
		</Shell>
	)
}
