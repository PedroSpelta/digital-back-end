import { IExpressController } from '../types/express';

const deposit: IExpressController = (req, res, next) => {
  try {
    const {} = req.body;
    const a = req.headers.authorization;
    console.log(a);
    res.send('deposit')
  } catch (err) {
    next(err);
  }
};

export default { deposit };
