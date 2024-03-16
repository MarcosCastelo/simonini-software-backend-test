import { IPaginationParams } from "../../../core/interfaces/IPaginationParams";
import { Post } from "../entities/Post";
import { IPostRepository } from "../ports/IPostRepository";

export class ListAllPosts {
  constructor (
    private _postRepository: IPostRepository
  ) {}

  async execute(pagination: IPaginationParams): Promise<Post[]> {
    const posts = await this._postRepository.findAll(pagination)
    return posts
  }
}