export interface IPassowordComparer {
  compare(password: string, hashedPassword: string): Promise<boolean>
}