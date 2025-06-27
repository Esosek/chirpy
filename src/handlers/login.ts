import { NextFunction, Request, Response } from 'express'

import { ValidationError, AuthenticationError } from '../types/errors.js'
import { checkPasswordHash } from '../auth.js'
import { getUserByEmail } from '../db/queries/users.js'

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
    res.status(200).json(user)
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
  return { email: reqBody.email, password: reqBody.password }
}

export default handlerLogin
