import express from 'express';
import bankingController from '../controllers/bankingController';

const bankingRouter = express.Router();

// bankingRouter.post('/transfer', bankingController.transfer);
bankingRouter.post('/deposit', bankingController.deposit);
bankingRouter.post('/transfer', bankingController.transfer);


export default bankingRouter;
