export class Post {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public readonly userId: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {}


}