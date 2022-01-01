import { NextFunction, Request, Response } from 'express';
import path from 'path';

const render = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.resolve('../client/build/index.html'));
  } catch (err) {
    next(err);
  }
};

export { render };
