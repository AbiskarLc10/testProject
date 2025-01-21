const grpcErrorCodeMap = require("./grpc-error-codes");

const customErrorHandler = (error, next) => {
  if (error.code <= 16) {
    return next({
      message: error.message,
      code: grpcErrorCodeMap[error.code].httpStatus,
      details: error.details,
    });
  }

  return next({
    message: error.message || "Error from backend",
    code: error.code || 500,
    details: error.details || "Action Failed",
  });
};

module.exports = customErrorHandler;
