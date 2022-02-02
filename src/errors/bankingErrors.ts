import { StatusCodes } from 'http-status-codes';

const bankingErrors = {
  missingToken: {
    status: StatusCodes.BAD_REQUEST,
    message: 'Missing token on the header',
  },
  invalidFormat: {
    status: StatusCodes.BAD_REQUEST,
    message:
      'Invalid format. Account is a string of 5 digits and password is a string of 6 digits.',
  },
  invalidQuantity: {
    status: StatusCodes.BAD_REQUEST,
    message:
      'Invalid quantity, amount need to be positive number and smaller then R$2000.',
  },
  notEnoughTransfer: {
    status: StatusCodes.BAD_REQUEST,
    message:
      'Your account do not have enough money on wallet to make the transference.',
  },
  invalidToken:{
    status: StatusCodes.BAD_REQUEST,
    message:
      'Invalid token. You need to be log in to receive a valid token.',
  }
};

export default bankingErrors;
