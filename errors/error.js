class ErrorHandler extends Error {
  constructor(status, message, msgError) {
    super();
    this.status = status;
    this.message = message;
    this.msgError = msgError;
  }
}

module.exports = {
  ErrorHandler,
};
