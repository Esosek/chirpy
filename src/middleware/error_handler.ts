import { NextFunction, Request, Response } from 'express'

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    console.log(err.message)
    res.status(500).json({ error: 'Something went wrong on our end' })
  } else {
    next(err)
  }
}

export default errorHandler
