import { Router } from 'express'
import { postRoutes } from '../../../resources/post/routes/postRoutes'
import { userRoutes } from '../../../resources/user/routes/userRoutes'

const router = Router()

router.use('/posts', postRoutes)
router.use('/users', userRoutes)

export { router as routes }