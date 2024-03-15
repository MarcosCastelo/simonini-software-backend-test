import { register } from "module";
import { User } from "../../../../../src/resources/user/entities/User";
import { IUserRepository } from "../../../../../src/resources/user/ports/IUserRepository"
import { RegisterUser } from "../../../../../src/resources/user/useCases/RegisterUser";

describe('RegisterUser UseCase', () => {
  let userRepository: IUserRepository;
  let registerUser: RegisterUser

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn().mockImplementation((user: User) => Promise.resolve(user)),
      findUserByEmail: jest.fn().mockImplementation((email: string) => Promise.resolve(null)),
      deleteUser: jest.fn(),
      findUserById: jest.fn(),
      updateUser: jest.fn()
    }

    registerUser = new RegisterUser(userRepository)
  })

  it('should register a new user if the email is not taken', async () => {
    const user = { name: 'User', email: 'user@email.com', password: 'password' }
    const registeredUser = await registerUser.execute({
      email: user.email,
      name: user.name,
      password: user.password
    })

    expect(registeredUser).toBeInstanceOf(User)
    expect(userRepository.createUser).toHaveBeenCalled()
  })

  it('should not register a user if the email is already taken', async () => {
    userRepository.findUserByEmail = jest.fn().mockImplementation((email: string) => Promise.resolve(new User('1', 'Existing User', email, 'pasword')))
    
    await expect(registerUser.execute({
      name: 'New User', 
      email: 'user@email.com', 
      password: 'passowrd'
    })).rejects.toThrow('User with this email already exists.')

    expect(userRepository.findUserByEmail).toHaveBeenCalledWith('user@email.com')
    expect(userRepository.createUser).not.toHaveBeenCalled()
  })
})