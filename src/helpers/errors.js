export class DatabaseError extends Error {
  constructor(message, code) {
    super(message);

    this.name = 'DatabaseError';
    this.statusCode = code;
  }
}

export class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = code;
  }
}

export class AuthorizationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = code;
  }
}
