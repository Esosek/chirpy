import express from 'express'

import errorHandler from './middleware/error_handler.js'
import middlewareLogResponses from './middleware/log_responses.js'
import middlewareMetricsInc from './middleware/metrics_inc.js'
import handlerReadiness from './handlers/readiness.js'
import handlerMetric from './handlers/metrics.js'
import handlerReset from './handlers/reset.js'
import handlerValidateChirp from './handlers/validate_chirp.js'
import handlerCreateUser from './handlers/create_user.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(middlewareLogResponses)
app.use('/app', middlewareMetricsInc, express.static('./src/app'))
app.get('/api/healthz', handlerReadiness)
app.get('/admin/metrics', handlerMetric)
app.post('/admin/reset', handlerReset)
app.post('/api/validate_chirp', handlerValidateChirp)
app.post('/api/users', handlerCreateUser)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
