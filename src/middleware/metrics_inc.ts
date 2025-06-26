import { NextFunction, Request, Response } from 'express'
import { config } from '../config.js'

function middlewareMetricsInc(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  config.fileserverHits++
  next()
}

export default middlewareMetricsInc
