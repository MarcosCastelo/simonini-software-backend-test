import { Router } from "express";
import { CreatePostController } from "../controllers/CreatePostController";
import { ListAllPostsController } from "../controllers/ListAllPostsController";
import { PostRepository } from "../repositories/PostRepository";
import { CreatePost } from "../useCases/CreatePost";
import { ListAllPosts } from "../useCases/ListAllPosts";
import { PostValidator } from "../valiators/PostValidator";
import { verifyTokenMiddleware } from "../../../core/auth/verifyTokenMiddleware";

const postRepository = new PostRepository()
const validator = new PostValidator()
const createPostUseCase = new CreatePost(postRepository, validator)
const listAllPostsUseCase = new ListAllPosts(postRepository)

const createPostController = new CreatePostController(createPostUseCase)
const listAllPostsController = new ListAllPostsController(listAllPostsUseCase)

const router = Router()

router.post('/', verifyTokenMiddleware ,(req, res) => createPostController.handle(req, res))
router.get('/', (req, res) => listAllPostsController.handle(req, res))

export { router as postRoutes }

