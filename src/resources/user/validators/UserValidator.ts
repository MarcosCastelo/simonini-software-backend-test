import { IRegisterUserRequest } from "../interfaces/IRegisterUserRequest";
import { IUserValidator } from "../interfaces/IUserValidator";


export class UserValidator implements IUserValidator {  
  validate({name, email, password}: IRegisterUserRequest): string[] {
    const errors: string[] = []
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
      errors.push("The name must be between 2 and 50 characters.")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      errors.push("The email provided is invalid.");
    }

    if (typeof password !== 'string' || password.length < 6) {
      errors.push("The password must be at least 6 characters long.");
    }

    return errors
  }
}