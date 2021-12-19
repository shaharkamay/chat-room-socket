import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import UserModel from '../models/user';
import authService from '../services/auth';

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = <Record<string, string>>req.body;
    res.locals.validated =
      validator.isAlpha(firstName)
      && validator.isAlpha(lastName)
      && validator.isEmail(email)
      && validator.isStrongPassword(password, { minSymbols: 0 });

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
    res.locals.validated = validator.isEmail(email) && validator.isStrongPassword(password, { minSymbols: 0 });
    if (res.locals.validated) next();
    else next({ status: 400, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

const validate2FA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = <string>req.body.email;
    const user = await UserModel.findOne({ email });
    if (user && !user['2FA']) return next();

    const twoFactorSecret = <string>req.headers.twofactorsecret;
    const twoFactorToken = <string>req.headers.twofactortoken;
    if (twoFactorSecret && twoFactorToken) {
      console.log(twoFactorSecret, twoFactorToken);
      const isValid: { delta: number } | null = authService.twoFactor.verifyToken(twoFactorSecret, twoFactorToken);
      console.log(isValid);
      if (isValid && isValid.delta === 0) {
        next();
      } else {
        next({ status: 401, message: '2FA did not succeeded' });
      }
    } else {
      const secret = authService.twoFactor.generateSecret({ name: 'Chat room typescript', account: email });
      res.json({ secret });
      res.end();
    }
  } catch (error) {
    next(error);
  }
};

export { validateSignUp, validateLogin, validate2FA };