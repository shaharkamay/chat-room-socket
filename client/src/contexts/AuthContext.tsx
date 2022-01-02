import axios, { AxiosRequestHeaders } from 'axios';
import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import BASE_URL from '../index';
import { AuthContextInterface } from '../types/auth';
import ErrorContext from './ErrorContext';

export const AuthContext = React.createContext<AuthContextInterface | null>(
  null
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const errorContext = useContext(ErrorContext);
  const notyf = errorContext?.notyf;
  const [email, setEmail] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh') || ''
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access') || ''
  );
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);

  const askForNewToken = useCallback(async (refreshToken: string | null) => {
    return await axios.post(`${BASE_URL}/api/auth/token`, {
      token: refreshToken,
    });
  }, []);

  const get2FASecret = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await axios.get(`${BASE_URL}/api/auth/2FA`, {
      headers: {
        auth: accessToken || '',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  }, [loggedIn]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (refreshToken && refreshToken !== 'undefined' && !loggedIn) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { data } = await askForNewToken(refreshToken);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setAccessToken(data.accessToken);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          localStorage.setItem('access', data.accessToken || '');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setEmail(data.email);
          setLoggedIn(true);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (notyf) notyf.error(error.response.data);
          setRefreshToken(null);
        }
      }
    })();
  }, [refreshToken, askForNewToken, loggedIn]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (loggedIn) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = await get2FASecret();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setIs2FAEnabled(!('qr' in data.secret));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (notyf) notyf.error(error.response.data);
          setIs2FAEnabled(false);
        }
      }
    })();
  }, [loggedIn, email, is2FAEnabled]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = useCallback(
    async (
      { email, password }: { email: string; password: string },
      headers: AxiosRequestHeaders | undefined = undefined
    ): Promise<boolean | undefined> => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/login`,
          {
            email,
            password,
          },
          { headers }
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        if (data.is2FAEnabled) return data.is2FAEnabled as boolean;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setRefreshToken(data.refreshToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setAccessToken(data.accessToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        localStorage.setItem('refresh', data.refreshToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        localStorage.setItem('access', data.accessToken);
        setEmail(email);
        setLoggedIn(true);
        if (notyf) notyf.success('Logged in successfully');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (notyf) notyf.error(error.response.data);
      }
    },
    []
  );

  const signUp = useCallback(
    async ({
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }): Promise<{ isSignedUp: boolean } | undefined> => {
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/sign-up`, {
          firstName,
          lastName,
          email,
          password,
        });
        if (notyf) notyf.success('Signed up successfully');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (notyf) notyf.error(error.response.data);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Auth: accessToken || '',
          },
        }
      );
      setAccessToken(null);
      setRefreshToken(null);
      setEmail(null);
      setLoggedIn(false);
      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
      if (notyf) notyf.success('Logged out successfully');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (notyf) notyf.error(error.response.data);
    }
  }, [accessToken]);

  const enable2FA = useCallback(
    async (headers: AxiosRequestHeaders): Promise<boolean | undefined> => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/2FA`,
          {},
          {
            headers: {
              ...headers,
              auth: accessToken || '',
            },
          }
        );
        if (data.is2FAEnabled) {
          setIs2FAEnabled(true);
          if (notyf) notyf.success('2FA is enabled');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return data.is2FAEnabled;
        }
        if (notyf) notyf.error('Action denied!');
        return false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (notyf) notyf.error(error.response.data);
      }
    },
    [loggedIn]
  );

  const disable2FA = useCallback(async (): Promise<boolean | undefined> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.delete(`${BASE_URL}/api/auth/2FA`, {
        headers: {
          auth: accessToken || '',
        },
      });
      if (data.is2FADisabled) {
        setIs2FAEnabled(false);
        if (notyf) notyf.success('2FA is disabled');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data.is2FADisabled;
      }
      if (notyf) notyf.error('Action denied!');
      return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (notyf) notyf.error(error.response.data);
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        email,
        accessToken,
        login,
        logout,
        signUp,
        is2FAEnabled,
        enable2FA,
        disable2FA,
        get2FASecret,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
