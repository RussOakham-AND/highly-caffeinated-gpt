import Link from 'next/link'

import { NewsletterForm } from '@/components/forms/newsletter/newsletter-form'
import { Icons } from '@/components/icons'

import { Shell } from '../shells/shell'

export function SiteFooter() {
	return (
		<footer className="w-full border-t bg-background">
			<Shell variant="default" className="flex max-w-6xl justify-between">
				<section id="footer-content" aria-labelledby="footer-branding-header">
					<Link href="/" className="flex w-fit items-center space-x-2">
						<Icons.Logo className="size-6" aria-hidden="true" />
						<span className="sr-only">Home</span>
					</Link>
				</section>

				<section
					id="newsletter"
					aria-labelledby="newsletter-header"
					className="space-y-3"
				>
					<h4 className="text-base">Subscribe for updates</h4>
					<NewsletterForm />
				</section>
			</Shell>
		</footer>
	)
}
