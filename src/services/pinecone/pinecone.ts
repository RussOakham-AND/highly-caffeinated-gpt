import { Pinecone } from '@pinecone-database/pinecone'

import { env } from '@/env.mjs'

export const pinecone = new Pinecone({
	apiKey: env.PINECONE_API_KEY,
})

export const pineconeIndex = pinecone.Index(env.PINECONE_INDEX)
