import { User } from "../entities/User";
import { IUserRepository } from "../ports/IUserRepository";
import prisma from "../../../infra/db";

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
    })

    return new User(
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.id
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
        updatedUser.name,
        updatedUser.email,
        updatedUser.password,
        updatedUser.id,
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
        user.name, user.email, user.password, user.id
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
        user.name, user.email, user.password, user.id
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
      deletedUser.name,
      deletedUser.email,
      deletedUser.password,
      deletedUser.id,
    )
  }
}