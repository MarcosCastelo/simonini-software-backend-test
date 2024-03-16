import config from "../../infra/config";
import { ITokenGenerator } from "../interfaces/ITokenGenerator";
import jwt from 'jsonwebtoken'

export class JwtTokenGenerator implements ITokenGenerator {
  async generateToken(userDetails: { userId: string; email: string; }): Promise<string> {
    return await jwt.sign(userDetails, config.jwtSecret, { expiresIn: '1h'})
  }
}