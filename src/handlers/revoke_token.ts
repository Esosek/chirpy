import { NextFunction, Request, Response } from 'express'
import { getBearerToken } from '../auth.js'
import { revokeToken } from '../db/queries/refresh_tokens.js'

async function handlerRevokeToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = getBearerToken(req)
    await revokeToken(bearerToken)
    res.status(204).send('No Content')
  } catch (err) {
    next(err)
  }
}

export default handlerRevokeToken
