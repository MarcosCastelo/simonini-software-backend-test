import { startServer } from "./infra/web/server"
import "dotenv/config"

const initializeApplication = async () => {
  startServer()
}

initializeApplication()
  .catch(err => {
    console.error("Error during application initialization:", err)
    process.exit(1)
  })