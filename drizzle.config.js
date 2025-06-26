import { defineConfig } from 'drizzle-kit'

// Load environment variables
process.loadEnvFile()

function envOrThrow(key) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

export default defineConfig({
  schema: 'src/db',
  out: 'src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: envOrThrow('DB_URL')
  }
})
