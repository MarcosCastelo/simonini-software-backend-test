import { ListAllPosts } from "../useCases/ListAllPosts";
import { Request, Response } from "express"

export class ListAllPostsController {
  constructor(private lsitAllPostUseCase: ListAllPosts) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { page, limit } = request.query
      const paginationParams = {
        page: parseInt(page as string) || 1,
        limit: parseInt(limit as string) || 1,
      }

      const posts = await this.lsitAllPostUseCase.execute(paginationParams)

      return response.status(200).json(posts)
    } catch (error) {
      return response.status(400).json({
        message: error || 'Unexpected error.',
      })
    }
  }
}