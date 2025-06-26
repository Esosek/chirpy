import { NextFunction, Request, Response } from 'express'

function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on('finish', () => {
    if (res.statusCode !== 200) {
      console.log(
        `[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`
      )
    }
  })
  next()
}

export default middlewareLogResponses
