import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import ws from 'ws'

dotenv.config()

declare global {
	// eslint-disable-next-line vars-on-top, no-var
	var cachedPrisma: PrismaClient
}

neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient({ adapter })
} else {
	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient({ adapter })
	}
	prisma = global.cachedPrisma
}

export const db = prisma
