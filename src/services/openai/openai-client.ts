import { AzureOpenAI } from 'openai'

import { env } from '@/env.mjs'

export const openai = new AzureOpenAI({
	apiVersion: env.AZURE_OPEN_API_DEPLOYMENT_NAME,
	apiKey: env.AZURE_OPEN_AI_KEY,
	endpoint: env.AZURE_OPEN_AI_URL,
})
