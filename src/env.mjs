import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		AZURE_OPEN_AI_URL: z.string().min(1),
		AZURE_OPEN_AI_KEY: z.string().min(1),
		AZURE_OPEN_API_DEPLOYMENT_NAME: z.string().min(1),
		DATABASE_URL: z.string().min(1),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		KINDE_CLIENT_ID: z.string().min(1),
		KINDE_CLIENT_SECRET: z.string().min(1),
		KINDE_ISSUER_URL: z.string().min(1).url(),
		KINDE_SITE_URL: z.string().min(1).url(),
		KINDE_POST_LOGOUT_REDIRECT_URL: z.string().min(1).url(),
		KINDE_POST_LOGIN_REDIRECT_URL: z.string().min(1).url(),
	},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		AZURE_OPEN_AI_URL: process.env.AZURE_OPEN_AI_URL,
		AZURE_OPEN_AI_KEY: process.env.AZURE_OPEN_AI_KEY,
		AZURE_OPEN_API_DEPLOYMENT_NAME: process.env.AZURE_OPEN_API_DEPLOYMENT_NAME,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
		KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
		KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
		KINDE_SITE_URL: process.env.KINDE_SITE_URL,
		KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
		KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
	},
})
