import { IValidator } from "../../../core/interfaces/IValidator";
import { Post } from "../entities/Post";

export class PostValidator implements IValidator<Post> {
  validate(post: Post): string[] {
    const errors: string[] = []

    if (!post.title || post.title.trim().length === 0) {
      errors.push("Title is required.")
    }

    if (!post.content || post.content.trim().length === 0) {
      errors.push("Content is required.")
    }

    if (!post.userId || post.userId.trim().length === 0) {
      errors.push("UserId is required.")
    }

    return errors
  }
}