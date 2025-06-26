import { Request, Response } from 'express'

type Parameters = {
  body: string
}

function handlerValidateChirp(req: Request, res: Response) {
  try {
    const params = validateBody(req.body)
    res.status(200).json({ cleanedBody: profaneWords(params.body) })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message })
    }
  }
}

function validateBody(parsedBody: any): Parameters {
  if (!parsedBody && !parsedBody.body) {
    throw new Error('Something went wrong')
  }
  if (parsedBody.body.length > 140) {
    throw new Error('Chirp is too long')
  }
  return parsedBody
}

function profaneWords(body: string) {
  const wordsToReplace = ['kerfuffle', 'sharbert', 'fornax']
  const pattern = new RegExp(`\\b(${wordsToReplace.join('|')})\\b`, 'gi')
  return body.replace(pattern, '****')
}

export default handlerValidateChirp
