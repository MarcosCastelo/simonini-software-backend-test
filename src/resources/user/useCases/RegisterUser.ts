import { User } from "../entities/User";
import { IRegisterUserRequest } from "../interfaces/IRegisterUserRequest";
import { IUserRepository } from "../ports/IUserRepository";

export class RegisterUser {
  constructor (
    private _userRepository: IUserRepository
  ) {}

  async execute(request: IRegisterUserRequest): Promise<User> {
    const id = Date.now().toString()
    const user = new User(id, request.name, request.email, request.password)

    const existingUser = await this._userRepository.findUserByEmail(request.email)
    if (existingUser) {
      throw new Error('User with this email already exists.')
    }

    return this._userRepository.createUser(user)
  }
}