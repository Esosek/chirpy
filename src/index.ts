import express from 'express'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { config } from './config.js'
import errorHandler from './middleware/error_handler.js'
import middlewareLogResponses from './middleware/log_responses.js'
import middlewareMetricsInc from './middleware/metrics_inc.js'
import handlerReadiness from './handlers/readiness.js'
import handlerMetric from './handlers/metrics.js'
import handlerReset from './handlers/reset.js'
import handlerCreateUser from './handlers/create_user.js'
import handlerCreateChirp from './handlers/create_chirp.js'

const migrationClient = postgres(config.db.url, { max: 1 })
await migrate(drizzle(migrationClient), config.db.migrationConfig)

const app = express()
const PORT = 8080

app.use(express.json())
app.use(middlewareLogResponses)
app.use('/app', middlewareMetricsInc, express.static('./src/app'))
app.get('/api/healthz', handlerReadiness)
app.get('/admin/metrics', handlerMetric)
app.post('/admin/reset', handlerReset)
app.post('/api/users', handlerCreateUser)
app.post('/api/chirps', handlerCreateChirp)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
