import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../types/errors.js'

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message })
  } else {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
}

export default errorHandler
