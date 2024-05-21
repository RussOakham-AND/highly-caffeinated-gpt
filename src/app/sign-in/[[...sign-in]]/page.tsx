import { SignIn } from '@clerk/nextjs'

import { Shell } from '@/components/layout/shells/shell'

export default function Page() {
	return (
		<Shell variant="centered">
			<SignIn path="/sign-in" signUpUrl="/sign-up" />
		</Shell>
	)
}
