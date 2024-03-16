import { Post } from "../entities/Post";
import { IPostRepository } from "../ports/IPostRepository";

export class UpdatePost {
  constructor(
    private _postRepository: IPostRepository
  ) {}

  async execute(postId: string, postData: Partial<Post>): Promise<Post> {
    const updatedPost = await this._postRepository.update(postId, postData)
    if (!updatedPost) {
      throw new Error('Post not found or not updated')
    }

    return updatedPost
  }
}