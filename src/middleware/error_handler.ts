import { Request, Response, NextFunction } from 'express'
import {
  NotFoundError,
  ValidationError,
  AuthenticationError
} from '../types/errors.js'

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ValidationError) {
    console.log(err.message)
    res.status(400).json({ error: err.message })
  } else if (err instanceof NotFoundError) {
    console.log(err.message)
    res.status(404).send('Not Found')
  } else if (err instanceof AuthenticationError) {
    console.log(err.message)
    res.status(401).send('Unauthorized')
  } else {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
}

export default errorHandler
