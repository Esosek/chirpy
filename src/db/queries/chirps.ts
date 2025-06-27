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
