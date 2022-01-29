const { StatusCodes } = require('http-status-codes');

export default function errorMiddleware (err, _req, res, _next) {

  if (err.status) {
    return res.status(err.status).json(err.message);
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
};
