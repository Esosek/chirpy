import { db } from '../index.js'
import { type NewUser, users } from '../schema.js'

export async function createUser(user: NewUser) {
  try {
    const [result] = await db
      .insert(users)
      .values({ email: user.email })
      .onConflictDoNothing()
      .returning()
    return result
  } catch (err) {
    throw new Error('Failed to create user')
  }
}
