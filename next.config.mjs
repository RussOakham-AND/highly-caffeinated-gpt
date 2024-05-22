/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		webVitalsAttribution: ['CLS', 'FCP', 'FID', 'LCP', 'TTFB'],
	},
	images: {
		domains: ['media.giphy.com'],
	},
}

export default nextConfig
