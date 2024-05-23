import { Shell } from '@/components/layout/shells/shell'

export default function HeroSection() {
	return (
		<Shell variant="default">
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div className="mx-auto max-w-2xl py-6 sm:py-8 lg:py-10">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Cursor is an AI powered fork of VSCode
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							With one-click migration from VSCode, native extension support and
							the ability to connect to various LLMs, Cursor is the perfect tool
							for your development needs.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="https://cursor.sh/"
								className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								target="_blank"
								rel="noreferrer"
							>
								Download Cursor
							</a>
							<a
								href="https://docs.cursor.sh/get-started/moving-from-vsc-to-cursor"
								className="text-sm font-semibold leading-6 text-gray-900"
								target="_blank"
								rel="noreferrer"
							>
								Checkout the Docs <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Shell>
	)
}
