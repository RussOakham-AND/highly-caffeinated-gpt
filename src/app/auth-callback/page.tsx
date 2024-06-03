'use client'

import { PuffLoader } from 'react-spinners'
import { TRPCError } from '@trpc/server'
import { Route } from 'next'
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

import { trpc } from '../_trpc/client'

export default function Page() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const origin = searchParams.get('origin')

	const { data, isFetching, isSuccess, isError, error } =
		trpc.auth.authCallback.useQuery(undefined, {
			retry: true,
			retryDelay: 500,
		})

	if (isError || !isSuccess) {
		if (error instanceof TRPCError && error.code === 'UNAUTHORIZED') {
			router.push('/')
		}
	}

	if (!isFetching && isSuccess) {
		const { success } = data

		if (success) {
			// user is synced to db
			router.push(origin ? (`/${origin}` as Route) : ('/' as Route))
		}
	}

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
