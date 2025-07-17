import { Request, Response, NextFunction } from 'express'

import { type Chirp } from '../db/schema.js'
import { getChirps, getChirpById } from '../db/queries/chirps.js'

export async function handlerGetChirps(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorId = getAuthorId(req)
    const chirps = await getChirps(authorId)
    sortChirps(chirps, req.query['sort'])
    res.status(200).json(chirps)
  } catch (err) {
    next(err)
  }
}

export async function handlerGetChirp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const chirpId = req.params['chirpId']
    const chirp = await getChirpById(chirpId)
    res.status(200).json(chirp)
  } catch (err) {
    next(err)
  }
}

function getAuthorId(req: Request) {
  let authorId = ''
  let authorIdQuery = req.query.authorId
  if (typeof authorIdQuery === 'string') {
    authorId = authorIdQuery
  }
  return authorId
}

function sortChirps(chirps: Chirp[], sort: any) {
  console.log(sort)
  if (sort === 'desc') {
    chirps.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  } else {
    chirps.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
  }
}
