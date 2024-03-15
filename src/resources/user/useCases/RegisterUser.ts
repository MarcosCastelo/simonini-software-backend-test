import { IIdGenerator } from "../../../core/interfaces/IIdGenerator";
import { IPasswordEncryptor } from "../../../core/interfaces/IPasswordEncryptor";
import { User } from "../entities/User";
import { IRegisterUserRequest } from "../interfaces/IRegisterUserRequest";
import { IUserValidator } from "../interfaces/IUserValidator";
import { IUserRepository } from "../ports/IUserRepository";
import { UserValidator } from "../validators/UserValidator";

export class RegisterUser {
  constructor (
    private _userRepository: IUserRepository,
    private _idGenerator: IIdGenerator,
    private _passwordEncryptor: IPasswordEncryptor,
    private _userValidator: IUserValidator
  ) {}

  async execute(request: IRegisterUserRequest): Promise<User> {
    const validationErros = this._userValidator.validate(request)

    if (validationErros.length > 0) {
      throw new Error(validationErros.join(' '))
    }

    const existingUser = await this._userRepository.findUserByEmail(request.email)
    if (existingUser) {
      throw new Error('User with this email already exists.')
    }

    const id = this._idGenerator.generate()
    const encryptedPassword = await this._passwordEncryptor.encrypt(request.password)
    const user = new User(id, request.name, request.email, encryptedPassword)

    return this._userRepository.createUser(user)
  }
}