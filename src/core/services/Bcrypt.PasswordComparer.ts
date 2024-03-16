import { IPassowordComparer } from "../interfaces/IPassowordComparer";
import bcrypt from 'bcryptjs'

export class BcryptPasswordComparer implements IPassowordComparer {
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}