import { Request, Response } from 'express'

function validateChirp(req: Request, res: Response) {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    try {
      console.log(body)
      const parsedBody = JSON.parse(body)
      const validatedBody = validateBody(parsedBody)
      if (validatedBody.body.length > 140) {
        res.status(400).send({ error: 'Chirp is too long' })
      } else {
        res.status(200).send({ valid: true })
      }
    } catch (error) {
      res.status(400).send({
        error: 'Something went wrong'
      })
    }
  })
}

function validateBody(parsedBody: any) {
  if (!parsedBody && !parsedBody.body) {
    console.log('Invalid body')
    throw new Error('Invalid body')
  }
  return parsedBody as { body: string }
}

export default validateChirp
