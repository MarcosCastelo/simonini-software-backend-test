export interface ITokenGenerator {
  generateToken(userDetails: { userId: string, email: string }): Promise<string>
}