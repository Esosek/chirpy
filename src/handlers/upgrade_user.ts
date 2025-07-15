import { Request, Response, NextFunction } from 'express'

import { ValidationError } from '../types/errors.js'
import { upgradeUser } from '../db/queries/users.js'

type RequestBody = {
  event: string
  data: {
    userId: string
  }
}

async function handlerUpgradeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedInput = validateInput(req.body)
    if (validatedInput.event !== 'user.upgraded') {
      res.status(204).send()
    } else {
      await upgradeUser(validatedInput.data.userId)
      res.status(204).send()
    }
  } catch (err) {
    next(err)
  }
}

function validateInput(reqBody: any): RequestBody {
  if (!reqBody.event) {
    throw new ValidationError('Missing event property')
  }
  if (!reqBody.data || !reqBody.data.userId) {
    throw new ValidationError('Missing data or userId property')
  }
  return { event: reqBody.event, data: { userId: reqBody.data.userId } }
}

export default handlerUpgradeUser
