import { Request, Response, NextFunction } from 'express'
import { getChiprs, getChirpById } from '../db/queries/chirps.js'

export async function handlerGetChirps(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const chirps = await getChiprs()
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
