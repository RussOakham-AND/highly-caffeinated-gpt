import { SignIn } from '@clerk/nextjs'

import { Shell } from '@/components/layout/shells/shell'
import { env } from '@/env.mjs'

let baseUrl = env.BASE_URL

if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://localhost:3000'
}

export default function Page() {
	return (
		<Shell variant="centered">
			<SignIn
				path="/sign-in"
				signUpUrl="/sign-up"
				fallbackRedirectUrl={`${baseUrl}/api/auth-callback`}
			/>
		</Shell>
	)
}
