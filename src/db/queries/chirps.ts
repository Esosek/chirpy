import { eq, and } from 'drizzle-orm'

import { AuthorizationError, NotFoundError } from '../../types/errors.js'
import { db } from '../index.js'
import { chirps } from '../schema.js'

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

    if (!result) {
      throw new NotFoundError('Chirp not found')
    }

    return result
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err
    }
    console.log(err)
    throw new Error('Failed to retrieve chirp')
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

export async function deleteChirp(userId: string, chirpId: string) {
  try {
    const chirp = await getChirpById(chirpId)
    if (chirp.userId !== userId) {
      throw new AuthorizationError('Chirp not owned by user')
    }
    await db
      .delete(chirps)
      .where(and(eq(chirps.id, chirpId), eq(chirps.userId, userId)))
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof AuthorizationError) {
      throw err
    } else throw new Error('Chirp deletion failed')
  }
}
