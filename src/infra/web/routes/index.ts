import { Router } from 'express'
import { postRoutes } from '../../../resources/post/routes/postRoutes'

const router = Router()

router.use('/posts', postRoutes)

export { router as routes }