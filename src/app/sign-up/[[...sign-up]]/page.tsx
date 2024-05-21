import { SignUp } from '@clerk/nextjs'

import { Shell } from '@/components/layout/shells/shell'

export default function Page() {
	return (
		<Shell variant="centered">
			<SignUp path="/sign-up" signInUrl="/sign-in" />
		</Shell>
	)
}
