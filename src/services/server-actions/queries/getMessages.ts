import axios from 'axios'

import { OpenAiResponse } from '@/app/schemas/openai.types'

let baseUrl = process.env.VERCEL_URL
const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
	baseUrl = 'http://localhost:3000'
}

export const getMessages = async () => {
	const response = await axios.get<OpenAiResponse>(`${baseUrl}/api/chat`, {
		headers: {
			Authorization: ``,
		},
	})

	return response.data
}
