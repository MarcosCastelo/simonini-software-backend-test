import bcrypt from "bcryptjs"
import { IPasswordEncryptor } from "../interfaces/IPasswordEncryptor";

export class BcryptPasswordEncryptor implements IPasswordEncryptor {
  async encrypt(password: string): Promise<string> {
      const salt = await bcrypt.genSalt()
      return bcrypt.hash(password, salt)
  }
}