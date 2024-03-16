import { Router } from "express";
import { UuidIdGenerator } from "../../../core/services/UuidIdGenerator";
import { CreatePostController } from "../controllers/CreatePostController";
import { ListAllPostsController } from "../controllers/ListAllPostsController";
import { PostRepository } from "../repositories/PostRepository";
import { CreatePost } from "../useCases/CreatePost";
import { ListAllPosts } from "../useCases/ListAllPosts";
import { PostValidator } from "../valiators/PostValidator";

const postRepository = new PostRepository()
const idGenerator = new UuidIdGenerator()
const validator = new PostValidator()
const createPostUseCase = new CreatePost(postRepository, idGenerator, validator)
const listAllPostsUseCase = new ListAllPosts(postRepository)

const createPostController = new CreatePostController(createPostUseCase)
const listAllPostsController = new ListAllPostsController(listAllPostsUseCase)

const router = Router()

router.post('/', (req, res) => createPostController.handle(req, res))
router.get('/', (req, res) => listAllPostsController.handle(req, res))

export { router as postRoutes }

