import express from 'express'
import { middlewareLogResponses, middlewareMetricsInc } from './middleware.js'
import handlerReadiness from './handlers/handler_readiness.js'
import handlerMetric from './handlers/handler_metrics.js'
import handlerReset from './handlers/handler_reset.js'

const app = express()
const PORT = 8080

app.use(middlewareLogResponses)
app.use('/app', middlewareMetricsInc, express.static('./src/app'))
app.get('/healthz', handlerReadiness)
app.get('/metrics', handlerMetric)
app.get('/reset', handlerReset)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
