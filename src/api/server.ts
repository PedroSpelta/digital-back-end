import app from './app';
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`[express]: Running on ${PORT}`);
});
