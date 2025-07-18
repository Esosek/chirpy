import { pgTable, uuid, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'

export type User = typeof users.$inferInsert
export type Chirp = typeof chirps.$inferSelect

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: varchar('email', { length: 256 }).unique().notNull(),
  hashedPassword: varchar('hashed_password').default('unset').notNull(),
  isChirpyRed: boolean('is_chirpy_red').default(false).notNull()
})

export const chirps = pgTable('chirps', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  body: varchar('body', { length: 140 }).notNull()
})

export const refreshTokens = pgTable('refresh_tokens', {
  token: varchar('token').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  revokedAt: timestamp('revoked_at')
})
