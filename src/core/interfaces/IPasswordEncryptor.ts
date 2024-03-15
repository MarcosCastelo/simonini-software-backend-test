export interface IPasswordEncryptor {
  encrypt(password: string): Promise<string>
}