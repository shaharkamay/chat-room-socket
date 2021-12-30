export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type NewUser = Omit<User, 'id'>;

export type LoggedUser = Omit<NewUser, 'firstName' | 'lastName'>;

export type NewUserFields = {
  firstName: unknown;
  lastName: unknown;
  email: unknown;
  password: unknown;
};

// export type AuthenticatedUser = Omit<User, "firstName" | "lastName" | "password">;

export type LoggedUserFields = Omit<NewUserFields, 'firstName' | 'lastName'>;
