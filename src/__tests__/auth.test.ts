import { describe, it, expect, beforeAll } from 'vitest'
import { Request } from 'express'
import {
  makeJWT,
  validateJWT,
  getBearerToken,
  hashPassword,
  checkPasswordHash,
  getAPIKey
} from '../auth.js'

describe('Password Hashing', () => {
  const password1 = 'correctPassword123!'
  const password2 = 'anotherPassword456!'
  let hash1: string

  beforeAll(async () => {
    hash1 = await hashPassword(password1)
  })

  it('should return true for the correct password', async () => {
    const result = await checkPasswordHash(password1, hash1)
    expect(result).toBe(true)
  })

  it('should return false for the wrong password', async () => {
    const result = await checkPasswordHash(password2, hash1)
    expect(result).toBe(false)
  })
})

describe('JWT authentication', () => {
  const userId = '0320e649-63cc-4a72-84cd-654ba566303a'
  const expiresIn = 1
  const secret1 = 'justlife'
  const secret2 = 'topsecret'
  let jwt = ''

  beforeAll(async () => {
    jwt = makeJWT(userId, secret1, expiresIn)
  })

  it('should generate a JWT', () => {
    expect(jwt).toBeDefined()
  })

  it('should verify token with correct secret', () => {
    const jwtUserId = validateJWT(jwt, secret1)
    expect(jwtUserId).toBe(userId)
  })

  it('should fail to verify token with wrong secret', () => {
    expect(() => validateJWT(jwt, secret2)).toThrowError()
  })

  it('should fail to verify expired token', async () => {
    const jwt = makeJWT(userId, secret1, expiresIn)
    const jwtUserId = validateJWT(jwt, secret1)
    expect(jwtUserId).toBe(userId)

    await new Promise((resolve) => {
      setTimeout(resolve, expiresIn * 1000 + 50)
    })

    expect(() => validateJWT(jwt, secret1)).toThrowError()
  })

  it('should extract the bearer token from Authorization header', () => {
    const mockRequest = {
      get: (header: string) => {
        if (header === 'Authorization') {
          return 'Bearer mockToken'
        }
        return null
      }
    }
    const token = getBearerToken(mockRequest as Request)
    expect(token).toBe('mockToken')
  })

  it('should throw an error if no bearer token is found in Authorization header', () => {
    const mockRequest = {
      get: (_header: string) => {
        return undefined
      }
    }
    expect(() => getBearerToken(mockRequest as Request)).toThrowError
  })
})

describe('API key authentication', () => {
  const apiKey = 'mockApiKey'

  it('should extract the API key from Authorization header', () => {
    const mockRequest = {
      get: (header: string) => {
        if (header === 'Authorization') {
          return `ApiKey ${apiKey}`
        }
        return null
      }
    }
    const key = getAPIKey(mockRequest as Request)
    expect(key).toBe(apiKey)
  })

  it('should throw an error if no API key is found in Authorization header', () => {
    const mockRequest = {
      get: (_header: string) => {
        return undefined
      }
    }
    expect(() => getAPIKey(mockRequest as Request)).toThrowError
  })
})
