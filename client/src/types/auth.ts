import { AxiosRequestHeaders } from 'axios';

export interface AuthContextInterface {
  loggedIn: boolean;
  email: string | null;
  accessToken: string | null;
  is2FAEnabled: boolean;
  login: (
    { email, password }: { email: string; password: string },
    headers?: AxiosRequestHeaders | undefined
  ) => Promise<boolean | undefined>;
  signUp: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<{ isSignedUp: boolean } | undefined>;
  logout: () => Promise<void>;
  enable2FA: (headers: AxiosRequestHeaders) => Promise<boolean | undefined>;
  disable2FA: () => Promise<boolean | undefined>;
  get2FASecret: () => Promise<
    { secret: string } | { secret: string; uri: string; qr: string }
  >;
}
