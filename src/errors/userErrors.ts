import { StatusCodes } from 'http-status-codes';

const userErrors = {
  wrongCredentials: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Incorrect or not existent account and password',
  },
  invalidFormat: {
    status: StatusCodes.BAD_REQUEST,
    message:
      'Invalid format. Account is a string of 5 digits and password is a string of 6 digits.',
  },
  invalidInput: {
    status: StatusCodes.EXPECTATION_FAILED,
    message: 'Name or cpf invalid',
  },
  alreadyRegistered: {
    status: StatusCodes.EXPECTATION_FAILED,
    message: 'Cpf already have an account',
  },
};

export default userErrors;
