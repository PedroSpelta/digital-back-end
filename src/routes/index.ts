import express from 'express';
import useRouter from '../routes/userRoutes';

const router = express.Router()

router.use('/user', useRouter);

export default router;