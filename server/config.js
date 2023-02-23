import dotenv from 'dotenv'
dotenv.config()

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if(value === null) {
    throw new Error(`Key ${key} is undefined`)
  }
  return value;
}
export const config = {
  jwt: {
    secretKey: required('JWT_SECRET_KEY'),
    expiresInDays: required('JWT_EXPIRES_IN_DAYS', '2d')
  },
  bcrypt: {
    bcryptSaltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
  },
  port: parseInt(required('PORT', 8080)),
  db: {
    host: required('DB_HOST'),
  },
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN')
  }
}