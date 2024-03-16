export interface IValidator<T> {
  validate(entity: T): string[]
}