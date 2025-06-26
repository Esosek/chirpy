import { NextFunction, Request, Response } from 'express'
import apiConfig from '../config.js'

function middlewareMetricsInc(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  apiConfig.fileserverHits++
  next()
}

export default middlewareMetricsInc
