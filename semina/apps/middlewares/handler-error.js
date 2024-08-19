const { StatusCodes } = require("http-status-codes");
const errorHandleMiddleware = (err, req, res, next) => {
  let customeError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    customeError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customeError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customeError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customeError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customeError.msg = `No item found with id : ${err.value}`;
    customeError.statusCode = 404;
  }

  return res.status(customeError.statusCode).json({ msg: customeError.msg });
};

module.exports = errorHandleMiddleware;
