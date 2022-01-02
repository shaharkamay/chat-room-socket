import { NextFunction, Request, Response } from 'express';
import config from '../config/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  if (err.status && err.message) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.status(err.status).json(config.mongo.url);
    // res.status(err.status).json(err.message);g
  }

  res.status(500).json('Server error, please try again later');
};

export default errorHandler;
