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
import { handlerCreateUser, handlerUpdateUser } from './handlers/users.js'
import handlerCreateChirp from './handlers/create_chirp.js'
import handlerDeleteChirp from './handlers/delete_chirp.js'
import { handlerGetChirps, handlerGetChirp } from './handlers/get_chirps.js'
import handlerLogin from './handlers/login.js'
import handlerRefreshToken from './handlers/refresh_token.js'
import handlerRevokeToken from './handlers/revoke_token.js'
import handlerUpgradeUser from './handlers/upgrade_user.js'

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
app.put('/api/users', handlerUpdateUser)
app.get('/api/chirps', handlerGetChirps)
app.get('/api/chirps/:chirpId', handlerGetChirp)
app.delete('/api/chirps/:chirpId', handlerDeleteChirp)
app.post('/api/chirps', handlerCreateChirp)
app.post('/api/login', handlerLogin)
app.post('/api/refresh', handlerRefreshToken)
app.post('/api/revoke', handlerRevokeToken)
app.post('/api/polka/webhooks', handlerUpgradeUser)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
