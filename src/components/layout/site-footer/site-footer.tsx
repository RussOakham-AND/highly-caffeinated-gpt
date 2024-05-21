import Link from 'next/link'

import { NewsletterForm } from '@/components/forms/newsletter/newsletter-form'
import { Icons } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Shell } from '../shells/shell'

export function SiteFooter() {
	return (
		<footer className="w-full border-t bg-background">
			<Shell variant="default" className="max-w-6xl">
				<section
					id="footer-content"
					aria-labelledby="footer-content-heading"
					className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20"
				>
					<section
						id="footer-branding"
						aria-labelledby="footer-branding-heading"
					>
						<Link href="/" className="flex w-fit items-center space-x-2">
							<Icons.Logo className="size-6" aria-hidden="true" />
							<span className="text-sm text-muted-foreground">
								Swiss ANDi Knife
							</span>
							<span className="sr-only">Home</span>
						</Link>
					</section>

					<section
						id="newsletter"
						aria-labelledby="newsletter-heading"
						className="space-y-3"
					>
						<h4 className="font-sm text-base text-muted-foreground">
							Subscribe for updates
						</h4>
						<NewsletterForm />
					</section>
				</section>
				<section
					id="footer-bottom"
					aria-labelledby="footer-bottom-heading"
					className="flex items-center space-x-4"
				>
					<div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
						{`Built By `}
						<Link
							href="/"
							target="_blank"
							rel="noreferrer"
							className="font-semibold transition-colors hover:text-foreground"
						>
							Team Perpetually Caffeinated - Club Wangari
						</Link>
					</div>
					<div className="flex items-center space-x-1">
						<Link
							href="https://github.com/RussOakham-AND/highly-caffeinated-gpt"
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({
									size: 'icon',
									variant: 'ghost',
								}),
							)}
						>
							<Icons.GitHub className="size-4" aria-hidden="true" />
							<span className="sr-only">GitHub</span>
						</Link>
						<ThemeToggle />
					</div>
				</section>
			</Shell>
		</footer>
	)
}
