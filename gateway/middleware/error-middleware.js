const errorHandlerMiddleware = (err, req, res, next) => {
  const message = err.message || "Error from backend";
  const extraDetails = err.details || "";
  const code = err.code || 500;

  return res.status(code).json({
    message: message,
    success: false,
    details: extraDetails,
  });
};


module.exports = errorHandlerMiddleware;
