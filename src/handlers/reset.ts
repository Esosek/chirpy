import { Request, Response } from 'express'

import { config } from '../config.js'
import { deleteAllUsers } from '../db/queries/users.js'

async function handlerReset(_req: Request, res: Response) {
  if (config.platform === 'prod') {
    res.status(403).send('Forbidden')
  }
  config.fileserverHits = 0
  await deleteAllUsers()
  res.set('Content-Type', 'text/plain')
  res.send('Server and database reset')
}

export default handlerReset
