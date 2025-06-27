import bcrypt from 'bcrypt'

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
