import { Post } from "../entities/Post";
import { CreatePost } from "../useCases/CreatePost";
import { Request, Response } from "express";

export class CreatePostController {
  constructor(
    private createPostUseCase: CreatePost
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { title, content } = request.body
      const userId = response.locals.user.userId

      const post: Post = await this.createPostUseCase.execute({ title, content, userId })

      return response.status(201).json(post)
    } catch (error) {
      return response.status(400).json({
        message: error || "Unexpected error."
      })
    }
  }
}