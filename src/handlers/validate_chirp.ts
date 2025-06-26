import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../types/errors.js'

type Parameters = {
  body: string
}

function handlerValidateChirp(req: Request, res: Response, next: NextFunction) {
  try {
    const params = validateBody(req.body)
    res.status(200).json({ cleanedBody: profaneWords(params.body) })
  } catch (err) {
    next(err)
  }
}

function validateBody(parsedBody: any): Parameters {
  if (!parsedBody && !parsedBody.body) {
    throw new Error('Something went wrong')
  }
  if (parsedBody.body.length > 140) {
    throw new ValidationError('Chirp is too long. Max length is 140')
  }
  return parsedBody
}

function profaneWords(body: string) {
  const wordsToReplace = ['kerfuffle', 'sharbert', 'fornax']
  const pattern = new RegExp(`\\b(${wordsToReplace.join('|')})\\b`, 'gi')
  return body.replace(pattern, '****')
}

export default handlerValidateChirp
