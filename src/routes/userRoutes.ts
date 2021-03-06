import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/create', userController.create);
userRouter.post('/login', userController.login);
userRouter.put('/edit',(req, res) => {});

export default userRouter;
