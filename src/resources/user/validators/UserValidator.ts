import { IValidator } from "../../../core/interfaces/IValidator";
import { User } from "../entities/User";


export class UserValidator implements IValidator<User> {  
  validate(user: User): string[] {
    const errors: string[] = []
    if (typeof user.name !== 'string' || user.name.trim().length < 2 || user.name.trim().length > 50) {
      errors.push("The name must be between 2 and 50 characters.")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof user.email !== 'string' || !emailRegex.test(user.email)) {
      errors.push("The email provided is invalid.");
    }

    if (typeof user.password !== 'string' || user.password.length < 6) {
      errors.push("The password must be at least 6 characters long.");
    }

    return errors
  }
}