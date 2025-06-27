import { eq } from 'drizzle-orm'
import { db } from '../index.js'
import { chirps } from '../schema.js'
import { NotFoundError } from '../../types/errors.js'

export async function getChiprs() {
  try {
    const result = await db.select().from(chirps).orderBy(chirps.createdAt)
    return result
  } catch (err) {
    throw new Error('Failed to retrieve chirps')
  }
}

export async function getChirpById(chirpId: string) {
  try {
    const [result] = await db
      .select()
      .from(chirps)
      .where(eq(chirps.id, chirpId))
    return result
  } catch (err) {
    throw new NotFoundError('Failed to retrieve chirp')
  }
}

export async function createChirp(userId: string, body: string) {
  try {
    const [result] = await db
      .insert(chirps)
      .values({ userId, body })
      .returning()
    return result
  } catch (err) {
    throw new Error('Failed to create chirp')
  }
}
