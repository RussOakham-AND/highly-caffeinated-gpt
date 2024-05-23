import { PuffLoader } from 'react-spinners'

import { Icons } from '@/components/icons'
import { Shell } from '@/components/layout/shells/shell'
import { Card, CardContent } from '@/components/ui/card'

export default function Loading() {
	return (
		<Shell variant="centered">
			<Icons.LogoLarge className="size-28" />
			<Card className="w-[350px]">
				<CardContent>
					<Shell variant="centered" className="min-h-64">
						<PuffLoader color="red" />
					</Shell>
				</CardContent>
			</Card>
		</Shell>
	)
}
