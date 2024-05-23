import Image from 'next/image'

import { Shell } from '@/components/layout/shells/shell'
import { Separator } from '@/components/ui/separator'

import CursorApiOptions from '../../../public/images/cursor-api-options.webp'
import ImportImage from '../../../public/images/import.webp'
import InstallImage from '../../../public/images/install.webp'

import HeroSection from './_components/hero-section'

export default function CursorAppPage() {
	return (
		<div className="flex w-full flex-col">
			<HeroSection />
			<Shell variant="centered-horizontal" className="max-w-6xl gap-6">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					A plugin AND owned replacement for GitHub Co-pilot
				</h2>
				<blockquote className="mt-6 max-w-3xl border-l-2 pl-6 italic">
					Cursor is not just a Visual Studio Code (VSC) extension. It’s its own
					application. But don’t worry! It’s a VSC fork. This means it has
					everything VSC has but with a lot more AI features built on top of it.
				</blockquote>
				<p className="max-w-4xl text-balance text-center leading-7 [&:not(:first-child)]:mt-6">
					Unlike with Github Copilot, where there is the inherent risk of client
					intellectual property being leaked. Cursor allows you to integrated
					and use your own AI Copilot models, allowing you to always own your
					code.
				</p>
				<Separator className="max-w-4xl" />
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Installation
				</h3>
				<p className="max-w-4xl text-balance text-center leading-7 [&:not(:first-child)]:mt-6">
					Head to the Cursor homepage and download the application suitable for
					your device and operating system.
				</p>
				<p className="max-w-4xl text-balance text-center leading-7 [&:not(:first-child)]:mt-2">
					During installation you&apos;ll be asked to choose your preferred IDR
					you want to import all your existing extensions and settings
					automatically
				</p>
				<div className="flex">
					<div className="w-1/2 p-2">
						<Image
							src={InstallImage}
							alt="Cursor install menu"
							quality={100}
							className="rounded-xl object-cover"
							height={400}
							width={530}
						/>
					</div>
					<div className="w-1/2 p-2">
						<Image
							src={ImportImage}
							alt="Cursor import menu"
							quality={100}
							className="rounded-xl object-cover"
							height={400}
							width={530}
						/>
					</div>
				</div>
				<Separator className="max-w-4xl" />
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Configure custom AND Copilot
				</h3>
				<p className="max-w-4xl text-balance text-center leading-7 [&:not(:first-child)]:mt-6">
					Head to the settings page to configure the custom AND Copilot Model,
					hosted via AzureAPI.
				</p>
				<a
					href="https://docs.cursor.sh/settings/your-own-azure-api-key"
					className="text-sm font-semibold leading-6 text-gray-900"
					target="_blank"
					rel="noreferrer"
				>
					Configure AzureAPI key <span aria-hidden="true">→</span>
				</a>
				<Image
					src={CursorApiOptions}
					alt="Cursor api options menu"
					quality={100}
					height={950}
					width={1080}
					className="rounded-xl object-cover"
				/>
				<Separator className="max-w-4xl" />
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Cook...
				</h3>
				<Image
					src="https://media.giphy.com/media/Ws6T5PN7wHv3cY8xy8/giphy.gif"
					alt="Cursor import menu"
					quality={100}
					className="rounded-xl object-cover"
					height={400}
					width={530}
				/>
			</Shell>
		</div>
	)
}
