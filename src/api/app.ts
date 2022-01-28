import express from 'express';
import router from '../routes';

const app = express();
app.get('/', (_req, res) => {
  res.send('Hello');
});

app.use(router);
// app.use(errorMiddleware);

export default app;
