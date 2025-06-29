import { NextFunction, Request, Response } from 'express'

import { ValidationError, AuthenticationError } from '../types/errors.js'
import { config } from '../config.js'
import { checkPasswordHash, makeJWT } from '../auth.js'
import { getUserByEmail } from '../db/queries/users.js'

const MAX_TOKEN_EXPIRATION = 60 * 24 // 24 hours

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
    const jwtToken = makeJWT(
      user.id,
      validatedBody.expiresInSeconds,
      config.apiSecret
    )
    res.status(200).json({ ...user, token: jwtToken })
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

  if (
    reqBody.expiresInSeconds &&
    typeof reqBody.expiresInSeconds !== 'number'
  ) {
    throw new ValidationError('Expires in seconds must be a number')
  }
  if (validationErrors.length > 0) {
    throw new ValidationError(validationErrors.join(','))
  }
  return {
    email: reqBody.email,
    password: reqBody.password,
    expiresInSeconds:
      reqBody.expiresInSeconds < MAX_TOKEN_EXPIRATION
        ? reqBody.expiresInSeconds
        : MAX_TOKEN_EXPIRATION
  }
}

export default handlerLogin
