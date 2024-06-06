// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'drizzle-kit'

import 'dotenv/config'

export default defineConfig({
	dialect: 'postgresql',
	out: './src/services/drizzle',
	schema: './src/services/drizzle/schema.ts',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	// Print all statements
	verbose: true,
	// Always ask for confirmation
	strict: true,
})
