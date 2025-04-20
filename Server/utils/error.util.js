class AppError extends Error {
  constructor(messages, statusCode) {
    super(messages);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.contructor);
  }
}

export default AppError;
