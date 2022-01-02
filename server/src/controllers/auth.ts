import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = <Record<string, string>>req.body;

    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

const token = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.body.token;

    const dataObj = await authService.token(token);

    res.json(dataObj);
  } catch (err) {
    next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = <Record<string, string>>(
      req.body
    );

    const isSignedUp = await authService.signUp(
      firstName,
      lastName,
      email,
      password
    );
    res.send({ isSignedUp });
  } catch (err) {
    next(err);
  }
};

const logout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = <Record<string, string>>res.locals.user;

    const isLoggedOut = await authService.logout(userId);
    res.json({ isLoggedOut });
  } catch (err) {
    next(err);
  }
};

const create2FASecret = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = <string>res.locals.user.email;
    const secret = await authService.twoFactor.create2FASecret(email);
    res.json({ secret });
  } catch (error) {
    next(error);
  }
};

const enable2FA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const twoFactorSecret = <string>req.headers.twofactorsecret;
    const twoFactorToken = <string>req.headers.twofactortoken;
    const email = <string>res.locals.user.email;
    const user = await authService.twoFactor.enable2FA(
      email,
      twoFactorSecret,
      twoFactorToken
    );
    if (user) {
      res.json({ is2FAEnabled: true });
    } else return next({ status: '500', message: 'Could not enable 2FA' });
  } catch (error) {
    next(error);
  }
};

const disable2FA = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const email = <string>res.locals.user.email;
    const is2FADisabled = await authService.twoFactor.disable2FA(email);
    if (is2FADisabled) {
      res.json({ is2FADisabled });
    } else return next({ status: '500', message: 'Could not disable 2FA' });
  } catch (error) {
    next(error);
  }
};

// const generateSecret = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const email = <string>req.body.email;
//     const secret = authService.twoFactor.generateSecret({ name: 'Chat room typescript', account: email });
//     if (secret) {
//       res.json({ secret });
//     } else return next({ status: '500', message: 'Could not generate secret' });

//   } catch (error) {
//     next(error);
//   }
// };

export { login, token, signUp, logout, create2FASecret, enable2FA, disable2FA };
