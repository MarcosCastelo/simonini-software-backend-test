import { IPaginationParams } from "../../../core/interfaces/IPaginationParams";
import { Post } from "../entities/Post";

export interface IPostRepository {
  create(post: Post): Promise<Post>
  findAll(pagination: IPaginationParams): Promise<Post[]>
  findById(postId: string): Promise<Post | null>
  findAllByUser(userId: string): Promise<Post[]>
  update(postId: string, post: Partial<Post>): Promise<Post | null>
  delete(postId: string): Promise<Post | null>
}