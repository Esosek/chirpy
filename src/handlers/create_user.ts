import { Request, Response, NextFunction } from 'express'

import { type NewUser } from '../db/schema.js'
import { ValidationError } from '../types/errors.js'
import { createUser } from '../db/queries/users.js'

async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = validateInput(req.body)
    const createdUser = await createUser(validatedBody)
    res.status(201).json(createdUser)
  } catch (err) {
    next(err)
  }
}

function validateInput(reqBody: any) {
  if (!reqBody || !reqBody.email) {
    throw new ValidationError('Missing user email')
  }
  return reqBody as NewUser
}

export default createUserHandler
