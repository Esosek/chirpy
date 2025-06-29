import { NextFunction, Request, Response } from 'express'

import { ValidationError } from '../types/errors.js'
import { createChirp } from '../db/queries/chirps.js'
import { config } from '../config.js'
import { getBearerToken, validateJWT } from '../auth.js'

type Parameters = {
  body: string
  userId: string
}

async function createChirpHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = getBearerToken(req)
    const userId = validateJWT(bearerToken, config.apiSecret)
    const params = validateBody(req.body)
    const createdChirp = await createChirp(userId, profaneWords(params.body))
    res.status(201).json(createdChirp)
  } catch (err) {
    next(err)
  }
}

function validateBody(parsedBody: any): Parameters {
  const validationErrors: string[] = []
  if (!parsedBody) {
    throw new Error('Something went wrong')
  }
  if (!parsedBody.body) {
    validationErrors.push('Missing chirp content')
  }
  if (parsedBody.body.length > 140) {
    validationErrors.push('Chirp is too long. Max length is 140')
  }
  if (validationErrors.length) {
    throw new ValidationError(validationErrors.join(', '))
  }
  return parsedBody
}

function profaneWords(body: string) {
  const wordsToReplace = ['kerfuffle', 'sharbert', 'fornax']
  const pattern = new RegExp(`\\b(${wordsToReplace.join('|')})\\b`, 'gi')
  return body.replace(pattern, '****')
}

export default createChirpHandler
