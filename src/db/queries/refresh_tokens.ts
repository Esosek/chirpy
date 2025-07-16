import { eq } from 'drizzle-orm'

import { AuthenticationError, NotFoundError } from '../../types/errors.js'
import { db } from '../index.js'
import { refreshTokens, users } from '../schema.js'

const REFRESH_TOKEN_LIFETIME = 60 * 60 * 24 * 60 // 60 days

export async function storeRefreshToken(userId: string, token: string) {
  try {
    await db
      .insert(refreshTokens)
      .values({
        userId,
        token,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_LIFETIME)
      })
      .returning()
  } catch (err) {
    throw new Error('Failed to create refresh token')
  }
}

export async function getUserFromRefreshToken(token: string) {
  try {
    const [result] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
    if (!result) {
      throw new AuthenticationError('Refresh token not found')
    }
    if (result.revokedAt) {
      throw new AuthenticationError('Refresh token revoked')
    }
    if (result.expiresAt < new Date()) {
      throw new AuthenticationError('Refresh token expired')
    }
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, result.userId))
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  } catch (err) {
    if (err instanceof AuthenticationError) {
      throw err
    } else throw new Error('Failed to get user from refresh token')
  }
}

export async function revokeToken(token: string) {
  try {
    await db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.token, token))
  } catch (err) {
    throw new Error('Revoking token failed')
  }
}
