import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/create', userController.create);
userRouter.put('/edit',(req, res) => {});
userRouter.delete('/delete', () => {});
userRouter.get('/:id', () => {});

export default userRouter;