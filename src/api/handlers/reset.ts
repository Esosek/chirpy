import { Request, Response } from 'express'
import apiConfig from '../../config.js'

function handlerReset(_req: Request, res: Response) {
  apiConfig.fileserverHits = 0
  res.set('Content-Type', 'text/plain')
  res.send('Server hit count reset')
}

export default handlerReset
