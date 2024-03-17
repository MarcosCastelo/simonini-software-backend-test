type Config = {
  port: number
  jwtSecret: string
  databaseUrl: string
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  databaseUrl: process.env.DATABASE_URL as string
}

export default config