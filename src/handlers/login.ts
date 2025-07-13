import { NextFunction, Request, Response } from 'express'

import { ValidationError, AuthenticationError } from '../types/errors.js'
import { config } from '../config.js'
import { checkPasswordHash, makeJWT, makeRefreshToken } from '../auth.js'
import { getUserByEmail } from '../db/queries/users.js'
import { storeRefreshToken } from 'src/db/queries/refresh_tokens.js'

async function handlerLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedBody = validateBody(req.body)
    const { hashedPassword, ...user } = await getUserByEmail(
      validatedBody.email
    )
    const isUserAuthenticated = await checkPasswordHash(
      validatedBody.password,
      hashedPassword
    )
    if (!isUserAuthenticated) {
      throw new AuthenticationError('Incorrect email or password')
    }
    const jwtToken = makeJWT(user.id, config.apiSecret)

    const refreshToken = await makeRefreshToken()
    await storeRefreshToken(user.id, refreshToken)

    res
      .status(200)
      .json({ ...user, accessToken: jwtToken, refreshToken: refreshToken })
  } catch (err) {
    next(err)
  }
}

function validateBody(reqBody: any) {
  const validationErrors: string[] = []
  if (!reqBody) {
    throw new Error('Request body is missing')
  }

  if (!reqBody.email) {
    validationErrors.push('Email is required')
  }

  if (!reqBody.password) {
    validationErrors.push('Password is required')
  }

  if (validationErrors.length > 0) {
    throw new ValidationError(validationErrors.join(','))
  }
  return {
    email: reqBody.email,
    password: reqBody.password
  }
}

export default handlerLogin
