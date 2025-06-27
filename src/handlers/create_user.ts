import { Request, Response, NextFunction } from 'express'

import { ValidationError } from '../types/errors.js'
import { createUser } from '../db/queries/users.js'
import { hashPassword } from '../auth.js'

async function createUserHandler(
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

export default createUserHandler
