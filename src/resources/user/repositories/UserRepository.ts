import { User } from "../entities/User";
import { IUserRepository } from "../ports/IUserRepository";
import prisma from "../../../infra/db";

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
    )
  }

  async updateUser(user: User): Promise<User> {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          password: user.password
        }
      })

      return new User(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.password,
      )
  }

  async findUserByEmail(email: string): Promise<User | null> {
      const user = await prisma.user.findUnique({
        where: { email: email }
      })

      if (!user) {
        return null
      }

      return new User(
        user.id, user.name, user.email, user.password
      )
  }

  async findUserById(id: string): Promise<User | null> {
      const user = await prisma.user.findUnique({
        where: { id: id }
      })
      

      if (!user) {
        return null
      }

      return new User(
        user.id, user.name, user.email, user.password
      )
  }

  async deleteUser(id: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({
      where: {  id: id }
    })

    if (!deletedUser) {
      return null
    }

    return new User (
      deletedUser.id,
      deletedUser.name,
      deletedUser.email,
      deletedUser.password
    )
  }
}