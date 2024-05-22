import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/chat', '/chat(.*)'])

export default clerkMiddleware(
	(auth, req) => {
		if (isProtectedRoute(req)) auth().protect()
	},
	{
		signInUrl: '/',
	},
)

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
