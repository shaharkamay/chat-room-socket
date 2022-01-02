import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FormElementType } from '../../types/form';
import validator from 'validator';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/styles/two-factor.scss';
import Form from '../../components/form/Form';

function TwoFactor() {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext?.loggedIn;
  const login = authContext?.login;
  const enable2FA = authContext?.enable2FA;

  const [token, setToken] = useState('');

  const { state } = useLocation() as {
    state:
      | { email: string; password: string }
      | { secret: { secret: string; qr: string } };
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && 'email' in state) navigate('/');
  }, [loggedIn, navigate]);

  const formElements: FormElementType[] = [
    {
      labelValue: 'Code',
      type: 'text',
      id: 'code',
      placeholder: 'Enter code',
      state: token,
      setState: setToken,
      handleBlur: (e, setError) => {
        if (!validator.isNumeric(e.target.value)) {
          setError('Invalid code');
        } else setError('');
      },
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ('secret' in state && enable2FA) {
      const is2FAEnabled = await enable2FA({
        twofactorsecret: state.secret.secret,
        twofactortoken: token,
      });
      if (is2FAEnabled) navigate('/');
      else throw '2FA did not succeeded';
    } else if ('email' in state) {
      if (login) {
        await login(
          { email: state.email, password: state.password },
          { twoFactorToken: token }
        );
      }
    }
  };

  return (
    <div>
      {'secret' in state ? (
        <img className="qr-img" src={state.secret.qr} alt="QR" />
      ) : (
        ''
      )}
      <Form
        containerClass="two-factor-container"
        id="two-factor-form"
        title="two-factor"
        formElements={formElements}
        submitValue="Verify"
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default TwoFactor;
