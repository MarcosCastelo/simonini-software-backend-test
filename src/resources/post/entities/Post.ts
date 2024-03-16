export class Post {
  constructor(
    public title: string,
    public content: string,
    public readonly userId: string,
    public readonly id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {}


}