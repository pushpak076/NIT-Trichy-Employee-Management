const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR: //400
      res.json({
        title: "Validation Failed",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.NOT_FOUND: //404
      res.json({
        title: "Not Found",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED: //401
      res.json({
        title: "Unauthorized",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.FORBIDDEN: //403
      res.json({
        title: "Forbidden",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR: //500
      res.json({
        title: "Server Error",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All Good!",statusCode);
      break;
  }
};

module.exports = errorHandler;
