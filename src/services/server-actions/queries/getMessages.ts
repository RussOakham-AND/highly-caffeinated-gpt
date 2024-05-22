'use server'

import { auth } from '@clerk/nextjs/server'
import axios from 'axios'

import { env } from '@/env.mjs'

interface Message {
	role: 'user' | 'agent'
	content: string
}

let baseUrl = env.BASE_URL
const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
	baseUrl = 'http://localhost:3000'
}

export const getMessages = async () => {
	const token = await auth().getToken()

	const response = await axios.get<Message[]>(`${baseUrl}/api/chat`, {
		headers: {
			Authorization: `${token}`,
		},
	})

	return response.data
}
