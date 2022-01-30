import express from 'express';
import useRouter from '../routes/userRoutes';

const router = express.Router()

router.use('/user', useRouter);
router.use('/login', () => {});

export default router;