import { RegisterUser } from "../useCases/RegisterUser";
import { Request, Response } from "express";

export class RegisterUserController {
  constructor(
    private registerUserUseCase: RegisterUser
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body
      const user = await this.registerUserUseCase.execute({name, email, password})
      return response.status(201).json(user)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }
}