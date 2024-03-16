import { PrismaClient } from "@prisma/client"
import config from "../config"

const prisma = new PrismaClient ({
  datasources: {
    db: {
      url: config.databaseUrl
    }
  }
})

export default prisma