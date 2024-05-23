'use client'

import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'

import { trpc } from '../_trpc/client'

const Page = () => {
	const router = useRouter()

	const { data, isFetching, isError, isSuccess } = trpc.authCallback.useQuery(
		undefined,
		{
			retry: true,
			retryDelay: 500,
		},
	)

	if (isFetching && !data) {
		return (
			<Shell variant="centered">
				<div className="flex flex-col items-center gap-2">
					<Icons.Spinner className="h-8 w-8 animate-spin text-zinc-800" />
					<h3 className="text-xl font-semibold">Setting up your account...</h3>
					<p>You will be redirected automatically.</p>
				</div>
			</Shell>
		)
	}

	if (isError || !isSuccess) {
		return (
			<Shell variant="centered">
				<div className="flex flex-col items-center gap-2">
					<Icons.Spinner className="h-8 w-8 animate-spin text-zinc-800" />
					<h3 className="text-xl font-semibold">Something went wrong....</h3>
					<p>Bugger</p>
				</div>
			</Shell>
		)
	}

	router.push('/')

	return null
}

export default Page
