import { SignIn } from '@clerk/nextjs'

import { Shell } from '@/components/layout/shells/shell'

let baseUrl = process.env.VERCEL_URL

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
