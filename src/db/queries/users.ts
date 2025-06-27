import { eq } from 'drizzle-orm'

import { db } from '../index.js'
import { NotFoundError } from '../../types/errors.js'
import { type NewUser, users } from '../schema.js'

type UserResponse = Omit<NewUser, 'hashedPassword'>

export async function createUser(user: NewUser): Promise<UserResponse> {
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

export async function deleteAllUsers() {
  try {
    await db.delete(users)
  } catch (err) {
    throw new Error('Failed to delete users')
  }
}
