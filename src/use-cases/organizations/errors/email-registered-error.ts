export class EmailRegisteredError extends Error {
  constructor(message = 'E-mail already exists.') {
    super(message);
  }
}