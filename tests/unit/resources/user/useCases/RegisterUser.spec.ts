import { register } from "module";
import { User } from "../../../../../src/resources/user/entities/User";
import { IUserRepository } from "../../../../../src/resources/user/ports/IUserRepository"
import { RegisterUser } from "../../../../../src/resources/user/useCases/RegisterUser";
import { IIdGenerator } from "../../../../../src/core/interfaces/IIdGenerator";
import { IPasswordEncryptor } from "../../../../../src/core/interfaces/IPasswordEncryptor";
import { IUserValidator } from "../../../../../src/resources/user/interfaces/IUserValidator";

describe('RegisterUser UseCase', () => {
  let userRepository: IUserRepository
  let registerUser: RegisterUser
  let idGenerator: IIdGenerator
  let passwordEncryptor: IPasswordEncryptor
  let userValidator: IUserValidator

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn().mockImplementation((user: User) => Promise.resolve(user)),
      findUserByEmail: jest.fn().mockImplementation((email: string) => Promise.resolve(null)),
      deleteUser: jest.fn(),
      findUserById: jest.fn(),
      updateUser: jest.fn()
    }

    idGenerator = {
      generate: jest.fn().mockReturnValue("unique-id-1234")
    }

    passwordEncryptor = {
      encrypt: jest.fn().mockImplementation((password: string) => Promise.resolve(`encrypted-${password}`))
    }

    userValidator = {
      validate: jest.fn().mockReturnValue([])
    }

    registerUser = new RegisterUser(userRepository, idGenerator, passwordEncryptor, userValidator)
  })

  it('should register a new user if the email is not taken', async () => {
    const userData = { name: 'User', email: 'user@email.com', password: 'password' }
    const registeredUser = await registerUser.execute(userData)

    expect(registeredUser).toBeInstanceOf(User)
    expect(registeredUser.id).toBe("unique-id-1234")
    expect(registeredUser.password).toBe(`encrypted-${userData.password}`)
    expect(userRepository.createUser).toHaveBeenCalledWith(expect.any(User))
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

  it('should validate user data before registration', async () => {
    const request = {
      name: 'New User',
      email: 'user@email.com',
      password: 'password'
    }

    await expect(registerUser.execute(request))

    expect(userValidator.validate).toHaveBeenCalledWith(expect.any(User))
  })

  it('should not register user with invalid data', async () => {
    const validationErrors = ['Invalid data']
    userValidator.validate = jest.fn().mockReturnValue(validationErrors)

    const request = {
      name: 'New User',
      email: 'user@email.com',
      password: 'passowrd'
    }

    await expect(registerUser.execute(request))
      .rejects.toThrow(new Error(validationErrors.join(' ')))

    expect(userRepository.createUser).not.toHaveBeenCalled()
  })
})