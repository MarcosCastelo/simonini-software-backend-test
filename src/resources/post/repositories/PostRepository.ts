import { IPostRepository } from "../ports/IPostRepository";
import { Post } from "../entities/Post";
import prisma from "../../../infra/db";
import { IPaginationParams } from "../../../core/interfaces/IPaginationParams";

export class PostRepository implements IPostRepository {
  async create(post: Post): Promise<Post> {
    const createdPost = await prisma.post.create({
      data: {
        content: post.content,
        title: post.title,
        userId: post.userId
      }
    })

    return createdPost
  }

  async update(postId: string, post: Partial<Post>): Promise<Post | null> {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: post
    })

    return updatedPost
  }

  async findAll(pagination: IPaginationParams): Promise<Post[]> {
    const { page, limit } = pagination
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit
    })
    return posts
  }

  async findAllByUser(userId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: { userId }
    })
    return posts
  }

  async findById(postId: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })
    return post
  }

  async delete(postId: string): Promise<Post | null> {
    const deletedPost = prisma.post.delete({
      where: { id: postId }
    })
    return deletedPost
  }
}