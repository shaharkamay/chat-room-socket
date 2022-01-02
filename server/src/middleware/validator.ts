import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import UserModel from '../models/user';
import authService from '../services/auth';
import { User } from '../types/user';

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = <Record<string, string>>(
      req.body
    );
    res.locals.validated =
      validator.isAlpha(firstName) &&
      validator.isAlpha(lastName) &&
      validator.isEmail(email) &&
      validator.isStrongPassword(password, { minSymbols: 0 });

    if (res.locals.validated) next();
    else next({ status: 400, message: 'Invalid inputs' });
  } catch (error) {
    next(error);
  }
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = <string>req.body.email;
    const password = <string>req.body.password;
    res.locals.validated =
      validator.isEmail(email) &&
      validator.isStrongPassword(password, { minSymbols: 0 });

    if (res.locals.validated) next();
    else next({ status: 400, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

const validate2FA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = <string>req.body.email;
    const user = (await UserModel.findOne({ email })) as User;
    if (user && user.secret2FA === '') return next();
    else if (!('twofactortoken' in req.headers))
      return res.json({ is2FAEnabled: true });
    const twoFactorSecret = user.secret2FA;
    const twoFactorToken = <string>req.headers.twofactortoken;
    if (twoFactorSecret && twoFactorToken) {
      const isValid: { delta: number } | null =
        authService.twoFactor.verifyToken(twoFactorSecret, twoFactorToken);
      if (isValid && isValid.delta === 0) {
        next();
      } else {
        next({ status: 401, message: '2FA did not succeeded' });
      }
    }
  } catch (error) {
    next(error);
  }
};

export { validateSignUp, validateLogin, validate2FA };
