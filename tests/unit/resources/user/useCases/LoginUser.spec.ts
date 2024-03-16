import { IUserRepository } from "../../../../../src/resources/user/ports/IUserRepository"
import { IPassowordComparer } from "../../../../../src/core/interfaces/IPassowordComparer"
import { ITokenGenerator } from "../../../../../src/core/interfaces/ITokenGenerator"
import { LoginUser } from "../../../../../src/resources/user/useCases/LoginUser"
import { User } from "../../../../../src/resources/user/entities/User"
import { LoginValidator } from "../../../../../src/resources/user/validators/LoginValidator"

describe('LoginUser UseCase', () => {
  let userRepository: IUserRepository
  let passwordComparer: IPassowordComparer
  let tokenGenerator: ITokenGenerator
  let loginUser: LoginUser
  let loginValidator: LoginValidator

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn().mockImplementation((user: User) => Promise.resolve(user)),
      findUserByEmail: jest.fn().mockImplementation((email: string) => Promise.resolve(null)),
      deleteUser: jest.fn(),
      findUserById: jest.fn(),
      updateUser: jest.fn()
    }
    passwordComparer = {
      compare: jest.fn(),
    }
    tokenGenerator = {
      generateToken: jest.fn(),
    }

    loginValidator = {
      validate: jest.fn().mockImplementation(({email, password}) => []) 
    }

    
    loginUser = new LoginUser(userRepository, passwordComparer, tokenGenerator, loginValidator)
  })

  it('should authenticate a user and return a token', async () => {
    const mockUser = { id: '1', email: 'test@example.com', password: 'hashedPassword' }
    userRepository.findUserByEmail = jest.fn().mockResolvedValue(mockUser)
    passwordComparer.compare = jest.fn().mockResolvedValue(true)
    tokenGenerator.generateToken = jest.fn().mockResolvedValue('authToken')
  
    const result = await loginUser.execute({ email: 'test@example.com', password: 'correctPassword' })
  
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com')
    expect(passwordComparer.compare).toHaveBeenCalledWith('correctPassword', 'hashedPassword')
    expect(tokenGenerator.generateToken).toHaveBeenCalledWith({ userId: '1', email: 'test@example.com' })
    expect(result).toEqual('authToken')
  })

  it('should throw an error if no user is found for the given email', async () => {
    userRepository.findUserByEmail = jest.fn().mockResolvedValue(null)
  
    await expect(loginUser.execute({ email: 'test@example.com', password: 'passwd' }))
      .rejects.toThrow('Login error')
  
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com')
  })

  
})