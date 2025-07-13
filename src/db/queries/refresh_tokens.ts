import { db } from '../index.js'
import { refreshTokens } from '../schema.js'

export async function storeRefreshToken(userId: string, token: string) {
  try {
    await db
      .insert(refreshTokens)
      .values({ userId, token, expiresAt: new Date(Date.now() + 60) })
      .returning()
  } catch (err) {
    throw new Error('Failed to create refresh token')
  }
}

export async function getRefreshToken(token: string) {
  // TODO getRefreshToken from db
}
