export class User {
  constructor (
    public name: string,
    public email: string,
    private _password: string,
    public readonly id?: string,
  ) {}

  get password(): string {
    return this._password
  }

  setPassword(newPassword: string) {
    this._password = newPassword
  }
}