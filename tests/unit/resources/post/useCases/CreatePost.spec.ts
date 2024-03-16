import { IPostRepository } from "../../../../../src/resources/post/ports/IPostRepository"
import { CreatePost } from "../../../../../src/resources/post/useCases/CreatePost"
import { IValidator } from "../../../../../src/core/interfaces/IValidator"
import { Post } from "../../../../../src/resources/post/entities/Post"

describe('CreatePost UseCases', () => {
  let postRepo: IPostRepository
  let postValidator: IValidator<Post>
  let createPost: CreatePost

  beforeEach(() => {
    postRepo = {
      create: jest.fn().mockImplementation((post: Post) => Promise.resolve(post)),
      findById: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    }

    postValidator = {
      validate: jest.fn().mockReturnValue([])
    }


    createPost = new CreatePost(postRepo, postValidator)
  })

  it("should create a post with valid data", async () => {
    const post = {
      title: "title",
      content: "content",
      userId: "1"
    }

    const result = await createPost.execute(post)
    expect(result).toBeInstanceOf(Post)
    expect(postRepo.create).toHaveBeenCalledWith(expect.any(Post))
  })

  it('should not create a post with invalid data', async () => {
    const errors = ['Invalid data'];
    postValidator.validate = jest.fn().mockReturnValue(errors);
    const postData = {
      title: "title",
      content: "content",
      userId: "1"
    }
    await expect(createPost.execute(postData))
      .rejects.toThrow(new Error(errors.join(' ')))
    expect(postRepo.create).not.toHaveBeenCalled();
  })
})