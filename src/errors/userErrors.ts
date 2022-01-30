import { StatusCodes } from "http-status-codes";

const userErrors = {
  wrongCredentials: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Incorrect or not existent account and password'
  }
}

export default userErrors;