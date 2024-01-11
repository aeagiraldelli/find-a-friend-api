export class InvalidCredentialsError extends Error {
  constructor(messaage = 'Invalid credentials error') {
    super(messaage);
  }
}