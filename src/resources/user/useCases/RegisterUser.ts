import { IPasswordEncryptor } from "../../../core/interfaces/IPasswordEncryptor";
import { IValidator } from "../../../core/interfaces/IValidator";
import { User } from "../entities/User";
import { IRegisterUserRequest } from "../interfaces/IRegisterUserRequest";
import { IUserRepository } from "../ports/IUserRepository";

export class RegisterUser {
  constructor (
    private _userRepository: IUserRepository,
    private _passwordEncryptor: IPasswordEncryptor,
    private _userValidator: IValidator<User>
  ) {}

  async execute(request: IRegisterUserRequest): Promise<User> {
    const encryptedPassword = await this._passwordEncryptor.encrypt(request.password)

    const user = new User(request.name, request.email, encryptedPassword)

    const validationErros = this._userValidator.validate(user)

    if (validationErros.length > 0) {
      throw new Error(validationErros.join(' '))
    }

    const existingUser = await this._userRepository.findUserByEmail(request.email)
    if (existingUser) {
      throw new Error('User with this email already exists.')
    }

    return this._userRepository.createUser(user)
  }
}