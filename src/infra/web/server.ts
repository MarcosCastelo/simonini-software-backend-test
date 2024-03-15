import express from "express"
import config from "../config"
import routes from "./routes"
import helmet from "helmet"
import cors from "cors"
import prisma from "../db"


export const startServer = () => {
  const app = express()
  
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  
  app.use('/api', routes)
  
  app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
  });

  const shutdown = async() => {
    try {
      await prisma.$disconnect()
    } finally {
      process.exit(0)
    }
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}