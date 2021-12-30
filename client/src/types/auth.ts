import { AxiosRequestHeaders } from 'axios';

export interface AuthContextInterface {
  loggedIn: boolean;
  email: string | null;
  accessToken: string | null;
  is2FAEnabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (
    { email, password }: { email: string; password: string },
    headers?: AxiosRequestHeaders | undefined
  ) => Promise<any>;
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
  }) => Promise<unknown>;
  logout: () => Promise<void>;
  enable2FA: (headers: AxiosRequestHeaders) => Promise<boolean | undefined>;
  disable2FA: () => Promise<boolean | undefined>;
  get2FASecret: () => Promise<
    { secret: string } | { secret: string; uri: string; qr: string }
  >;
}
