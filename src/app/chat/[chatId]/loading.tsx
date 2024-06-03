import { PuffLoader } from 'react-spinners'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

import { Shell } from '@/components/layout/shells/shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Loading() {
	return (
		<Shell variant="default" className="py-2 md:py-2">
			<Card className="relative flex min-h-full flex-col justify-between gap-2">
				<CardContent className="flex flex-1 items-center justify-center p-6">
					<PuffLoader color="rgb(220, 38, 38)" size={250} />
				</CardContent>
				<CardFooter>
					<Input
						placeholder="Enter your query"
						autoFocus
						autoComplete="off"
						className="resize-none pr-12 text-base"
						disabled
					/>
					<Button type="submit" size="icon" aria-label="send message" disabled>
						<PaperPlaneIcon className="h-4 w-4" />
						<span className="sr-only">Send</span>
					</Button>
				</CardFooter>
			</Card>
		</Shell>
	)
}
