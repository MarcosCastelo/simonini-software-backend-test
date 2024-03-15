import { User } from "../entities/User"

export interface IUserRepository {
  createUser(user: User): Promise<User>
  updateUser(user: User): Promise<User>
  findUserById(id: string): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  deleteUser(id: string): Promise<User | null>
}