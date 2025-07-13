import { NextFunction, Request, Response } from 'express'

import { getBearerToken } from '../auth.js'
import { AuthenticationError } from '../types/errors.js'

async function handlerRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = getBearerToken(req)
    // TODO: Implement handlerRefreshToken
  } catch (err) {
    next(err)
  }
}

function getRefreshToken() {}

export default handlerRefreshToken
