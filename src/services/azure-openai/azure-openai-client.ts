import { AzureKeyCredential, OpenAIClient } from '@azure/openai'

import { env } from '@/env.mjs'

export const openAiClient = new OpenAIClient(
	env.AZURE_OPEN_AI_URL,
	new AzureKeyCredential(env.AZURE_OPEN_AI_KEY),
)
