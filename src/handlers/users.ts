import { Request, Response, NextFunction } from 'express'

import { ValidationError } from '../types/errors.js'
import { createUser, updateUser } from '../db/queries/users.js'
import { getBearerToken, hashPassword, validateJWT } from '../auth.js'
import { config } from '../config.js'

export async function handlerCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = validateInput(req.body)
    const hashedPassword = await hashPassword(validatedBody.password)
    const createdUser = await createUser({
      email: validatedBody.email,
      hashedPassword: hashedPassword
    })
    res.status(201).json(createdUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export async function handlerUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = getBearerToken(req)
    const userId = validateJWT(bearerToken, config.apiSecret)
    const validatedBody = validateInput(req.body)
    const hashedPassword = await hashPassword(validatedBody.password)
    const updatedUser = await updateUser({
      id: userId,
      email: validatedBody.email,
      hashedPassword
    })
    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
}

function validateInput(reqBody: any) {
  const validationErrors: string[] = []
  if (!reqBody) {
    validationErrors.push('Missing user data')
  }
  if (!reqBody.email) {
    validationErrors.push('Missing user email')
  }
  if (!reqBody.password) {
    validationErrors.push('Missing user password')
  }
  if (validationErrors.length > 0) {
    throw new ValidationError(validationErrors.join(','))
  }
  return reqBody as { email: string; password: string }
}
