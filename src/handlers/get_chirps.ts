import { Request, Response } from 'express'
import { getChiprs } from '../db/queries/chirps.js'

async function handlerGetChirps(_req: Request, res: Response) {
  const chirps = await getChiprs()
  res.status(200).json(chirps)
}

export default handlerGetChirps
