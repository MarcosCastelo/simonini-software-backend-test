import { Post } from "../entities/Post";
import { IPostRepository } from "../ports/IPostRepository";
import { PostRepository } from "../repositories/PostRepository";

export class GetPostById {
  constructor(
    private _postRepository: IPostRepository
  ) {}

  async execute(postId: string): Promise<Post | null> {
    const post = await this._postRepository.findById(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    return post
  }
}