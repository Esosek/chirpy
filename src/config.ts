import { MigrationConfig } from 'drizzle-orm/migrator'

process.loadEnvFile()

type ApiConfig = {
  fileserverHits: number
  platform: 'dev' | 'prod'
  apiSecret: string
  polkaKey: string
  db: DBConfig
}

type DBConfig = {
  url: string
  migrationConfig: MigrationConfig
}

export const config: ApiConfig = {
  fileserverHits: 0,
  platform: getPlatform(),
  apiSecret: envOrThrow('API_SECRET'),
  polkaKey: envOrThrow('POLKA_KEY'),
  db: {
    url: envOrThrow('DB_URL'),
    migrationConfig: {
      migrationsFolder: './src/db/migrations'
    }
  }
}

function envOrThrow(key: string) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

function getPlatform(): 'dev' | 'prod' {
  const platform = process.env['PLATFORM']
  if (platform === 'dev' || platform === 'prod') {
    return platform
  }
  return 'prod'
}
