import { Post } from "../entities/Post";
import { IPostRepository } from "../ports/IPostRepository";

export class ListPostsByUser {
  constructor(
    private _postRepository: IPostRepository
  ) {}

  async execute(userId: string): Promise<Post[]> {
    const posts = await this._postRepository.findAllByUser(userId)
    return posts
  }
}