'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import { env } from '@/env.mjs'

if (typeof window !== 'undefined') {
	posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false,
		capture_pageleave: true,
	})
}

interface CSPostHogProviderProps {
	children: React.ReactNode
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
