import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (err.status && err.message) res.status(err.status).json(err.message);

  res.status(500).json('Server error, please try again later');
};

export default errorHandler;
