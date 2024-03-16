import { IValidator } from "../../../core/interfaces/IValidator";
import { User } from "../entities/User";
import { ILoginRequest } from "../interfaces/ILoginRequest";


export class LoginValidator implements IValidator<ILoginRequest> {  
  validate({email, password}: ILoginRequest): string[] {
    const errors: string[] = []

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