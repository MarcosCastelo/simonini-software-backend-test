import { Post } from "../entities/Post";
import { IPostRepository } from "../ports/IPostRepository";

export class DeletePost {
  constructor(
    private _postRepository: IPostRepository
  ) {}

  async execute(postId: string): Promise<Post> {
    const deletedUser = await this._postRepository.delete(postId)
    if (!deletedUser) {
      throw new Error('Post not found or not deleted')
    }

    return deletedUser
  }
}