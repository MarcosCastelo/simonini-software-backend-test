import { IValidator } from "../../../core/interfaces/IValidator";
import { Post } from "../entities/Post";
import { ICreatePostRequest } from "../interfaces/ICreatePostRequest";
import { IPostRepository } from "../ports/IPostRepository";

export class CreatePost {
  constructor(
    private _postRepository: IPostRepository,
    private _validator: IValidator<Post>
  ) {}

  async execute(postData: ICreatePostRequest): Promise<Post> {

    const post = new Post(postData.title, postData.content ,postData.userId)

    const validationErrors = this._validator.validate(post)
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(' '))
    }

    const createdPost = await this._postRepository.create(post)
    return createdPost
  }
}