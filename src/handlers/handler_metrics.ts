import { Request, Response } from 'express'
import apiConfig from '../config.js'

function handlerMetric(_req: Request, res: Response) {
  res.set('Content-Type', 'text/plain')
  res.send('Hits: ' + apiConfig.fileserverHits)
}

export default handlerMetric
