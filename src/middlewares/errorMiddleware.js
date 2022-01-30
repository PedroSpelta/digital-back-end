const { StatusCodes } = require('http-status-codes');

export default function errorMiddleware(err, _req, res, _next) {
  const { status, message } = err;
  if (status) {
    return res.status(status).json({ message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
}
