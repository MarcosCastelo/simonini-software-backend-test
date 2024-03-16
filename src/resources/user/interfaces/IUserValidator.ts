import { IRegisterUserRequest } from "./IRegisterUserRequest";

export interface IUserValidator {
  validate(request: IRegisterUserRequest): string[]
}