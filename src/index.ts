import express from 'express'
import { middlewareLogResponses, middlewareMetricsInc } from './middleware.js'
import handlerReadiness from './api/handlers/readiness.js'
import handlerMetric from './api/handlers/metrics.js'
import handlerReset from './api/handlers/reset.js'

const app = express()
const PORT = 8080

app.use(middlewareLogResponses)
app.use('/app', middlewareMetricsInc, express.static('./src/app'))
app.get('/api/healthz', handlerReadiness)
app.get('/admin/metrics', handlerMetric)
app.post('/admin/reset', handlerReset)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
