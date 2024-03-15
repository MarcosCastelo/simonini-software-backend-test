export class User {
  constructor (
    public readonly id: string,
    public name: string,
    public email: string,
    private _password: string
  ) {}

  get password(): string {
    return this._password
  }

  setPassword(newPassword: string) {
    this._password = newPassword
  }
}