import { eq } from 'drizzle-orm'

import { db } from '../index.js'
import { NotFoundError } from '../../types/errors.js'
import { type User, users } from '../schema.js'

type UserResponse = Omit<User, 'hashedPassword'>

export async function createUser(user: User): Promise<UserResponse> {
  try {
    const [result] = await db
      .insert(users)
      .values({ email: user.email, hashedPassword: user.hashedPassword })
      .onConflictDoNothing()
      .returning()
    const { hashedPassword, ...userResponse } = result
    return userResponse
  } catch (err) {
    throw new Error('Failed to create user')
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [result] = await db.select().from(users).where(eq(users.email, email))
    return result
  } catch (err) {
    throw new NotFoundError('User not found')
  }
}

export async function updateUser(user: User) {
  try {
    if (!user.id) {
      throw new Error('Missing user id')
    }
    const [result] = await db
      .update(users)
      .set({ email: user.email, hashedPassword: user.hashedPassword })
      .where(eq(users.id, user.id!))
      .returning()

    const { hashedPassword, ...userResponse } = result
    return userResponse
  } catch (err) {
    throw new NotFoundError('User not found')
  }
}

export async function deleteAllUsers() {
  try {
    await db.delete(users)
  } catch (err) {
    throw new Error('Failed to delete users')
  }
}

export async function upgradeUser(userId: string) {
  try {
    const [result] = await db.select().from(users).where(eq(users.id, userId))
    if (!result) {
      throw new NotFoundError('User not found')
    }
    await db
      .update(users)
      .set({ isChirpyRed: true })
      .where(eq(users.id, userId))
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err
    } else throw new Error('Failed to upgrade user')
  }
}
