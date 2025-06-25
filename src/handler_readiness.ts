import { Request, Response } from 'express'

function handlerReadiness(req: Request, res: Response) {
  res.set('Content-Type', 'text/plain')
  res.send('OK')
}

export default handlerReadiness
