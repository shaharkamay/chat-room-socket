
import React, { ReactNode } from 'react';
import { ErrorContextInterface } from '../types/error';
import { Notyf } from 'notyf';

const ErrorContext = React.createContext<ErrorContextInterface | null>(null);

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const notyf = new Notyf({
    duration: 5000,
    position: { x: 'left', y: 'top' },
    types: [
      {
        type: 'error',
        background: 'indianred',
        dismissible: true,
      },
      {
        type: 'success',
        background: 'green',
        dismissible: true,
      },
    ],
  });

  return (
    <ErrorContext.Provider
      value={{
        notyf,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
export { ErrorProvider };
