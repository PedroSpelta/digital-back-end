import express from 'express';
import userRouter from '../routes/userRoutes';
import bankingRouter from './bankingRoutes';

const router = express.Router()

router.use('/user', userRouter);
router.use('/banking', bankingRouter);


export default router;