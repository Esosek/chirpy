import { NextFunction, Request, Response } from 'express'

import { getBearerToken, makeJWT } from '../auth.js'
import { getUserFromRefreshToken } from '../db/queries/refresh_tokens.js'
import { config } from '../config.js'

async function handlerRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = getBearerToken(req)
    const user = await getUserFromRefreshToken(bearerToken)
    const accessToken = makeJWT(user.id, config.apiSecret)
    res.status(200).send({ token: accessToken })
  } catch (err) {
    next(err)
  }
}

export default handlerRefreshToken
