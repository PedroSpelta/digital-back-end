import express from 'express';

const userRouter = express.Router();

userRouter.post('/create', (_req, res) => res.send('eae'));
userRouter.put('/edit',() => {});
userRouter.delete('/delete', () => {});
userRouter.get('/:id', () => {});

export default userRouter;