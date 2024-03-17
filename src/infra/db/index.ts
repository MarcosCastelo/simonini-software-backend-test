import { PrismaClient } from "@prisma/client"
import config from "../config"
import "dotenv/config"

const prisma = new PrismaClient ()

export default prisma