import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request } from 'express'

import { AuthenticationError } from './types/errors.js'

export async function hashPassword(password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(new Error('Failed to hash password'))
      }
      resolve(hash)
    })
  })
}

export async function checkPasswordHash(
  password: string,
  hash: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(new Error('Failed to check password hash'))
      }
      resolve(result)
    })
  })
}

type payload = Pick<jwt.JwtPayload, 'iss' | 'sub' | 'iat' | 'exp'>

export function makeJWT(
  userID: string,
  expiresIn: number,
  secret: string
): string {
  const issuedAt = Math.floor(Date.now() / 1000)
  const payload: payload = {
    iss: 'chirpy',
    sub: userID,
    iat: issuedAt,
    exp: issuedAt + expiresIn
  }
  return jwt.sign(payload, secret)
}

// Returns userId
export function validateJWT(tokenString: string, secret: string): string {
  try {
    const payload = jwt.verify(tokenString, secret)
    if (payload.sub && typeof payload.sub === 'string') {
      return payload.sub
    } else {
      throw new Error('JWT payload sub is missing or in wrong format')
    }
  } catch (err) {
    throw new AuthenticationError('JWT token is invalid')
  }
}

export function getBearerToken(req: Request) {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    throw new AuthenticationError('Authorization header is missing')
  }
  return authHeader.split(' ')[1]
}
