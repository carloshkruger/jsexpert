export class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} was called without an implementation`)
    this.name = NotImplementedException.name
  }
}