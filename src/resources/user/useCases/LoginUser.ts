import { IPassowordComparer } from "../../../core/interfaces/IPassowordComparer";
import { ITokenGenerator } from "../../../core/interfaces/ITokenGenerator";
import { ILoginRequest } from "../interfaces/ILoginRequest";
import { IUserRepository } from "../ports/IUserRepository";
import { LoginValidator } from "../validators/LoginValidator";

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordComparer: IPassowordComparer,
    private tokenGenerator: ITokenGenerator,
    private loginValidator: LoginValidator
  ) {}

  async execute({ email, password }: ILoginRequest): Promise<string> {
    const validationErrors = this.loginValidator.validate({email, password})
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(' '))
    }

    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      throw new Error('Login error')
    }

    const passwordMatch = await this.passwordComparer.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Login error')
    }
    const token = await this.tokenGenerator.generateToken({ userId: user.id as string, email: user.email })
    return token
  }
}