import { Request, Response } from 'express'
import { config } from '../config.js'

function handlerReset(_req: Request, res: Response) {
  config.fileserverHits = 0
  res.set('Content-Type', 'text/plain')
  res.send('Server hit count reset')
}

export default handlerReset
