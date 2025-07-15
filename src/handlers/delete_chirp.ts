import { Request, Response, NextFunction } from 'express'

import { getBearerToken, validateJWT } from '../auth.js'
import { config } from '../config.js'
import { deleteChirp } from '../db/queries/chirps.js'

async function handlerDeleteChirp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = getBearerToken(req)
    const userId = validateJWT(bearerToken, config.apiSecret)
    const chirpId = req.params['chirpId']
    await deleteChirp(userId, chirpId)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export default handlerDeleteChirp
