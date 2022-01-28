import express from 'express';

const app = express();
app.get('/', (_req, res) => {
  console.log('teste');

  res.send('Hello');
});

export default app;
