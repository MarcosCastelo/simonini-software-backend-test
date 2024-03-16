import { User } from "../../../../../src/resources/user/entities/User"
import { UserValidator } from "../../../../../src/resources/user/validators/UserValidator"

describe("UserValidator", () => {
  const userValidator = new UserValidator()

  it("should return no errors for valid data", () => {
    const data = new User(
      'User',
      'user@mail.com',
      'password',
      '1',
    )
    const errors = userValidator.validate(data)
    expect(errors).toHaveLength(0)
  })

  it("should return a invalid name error", () => {
    const data = new User(
      '',
      'user@mail.com',
      'password',
      '1',
    )
    const errors = userValidator.validate(data)
    expect(errors).toContain("The name must be between 2 and 50 characters.")
  })

  it("should return a email error", () => {
    const data = new User(
      'User',
      '',
      'password',
      '1',
    )
    const errors = userValidator.validate(data)
    expect(errors).toContain("The email provided is invalid.")
  })

  it("should return password error", () => {
    const data = new User(
      'User',
      'user@mail.com',
      '123',
      '1',
    )
    const errors = userValidator.validate(data)
    expect(errors).toContain("The password must be at least 6 characters long.")
  })
})