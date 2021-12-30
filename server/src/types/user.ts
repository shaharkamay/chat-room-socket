export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  secret2FA: string;
};

export type NewUser = Omit<User, 'id'>;

export type LoggedUser = Omit<NewUser, 'firstName' | 'lastName' | 'secret2FA'>;

export type NewUserFields = {
  firstName: unknown;
  lastName: unknown;
  email: unknown;
  password: unknown;
};

export type TwoFactorOptions = {
  name: string;
  account: string;
};

export type LoggedUserFields = Omit<NewUserFields, 'firstName' | 'lastName'>;
