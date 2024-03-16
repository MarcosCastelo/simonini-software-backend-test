import { Request, Response } from "express";
import { LoginUser } from "../useCases/LoginUser";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUser) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const token = await this.loginUserUseCase.execute({email, password})
      return res.status(200).json({
        message: "Login sucessful",
        token
      })
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Unexpected error during login"
      })
    }
  }
}