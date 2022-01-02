import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/form/Form';
import '../../assets/styles/login.scss';
import validator from 'validator';
import { FormElementType } from '../../types/form';

function Login() {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext?.loggedIn;
  const login = authContext?.login;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  const formElements: FormElementType[] = [
    {
      labelValue: 'Email',
      type: 'email',
      id: 'email',
      placeholder: 'Enter Email',
      state: email,
      setState: setEmail,
      handleBlur: (e, setError) => {
        if (!validator.isEmail(e.target.value)) {
          setError('Invalid email');
        } else setError('');
      },
    },
    {
      labelValue: 'Password',
      type: 'password',
      id: 'password',
      placeholder: 'Enter Password',
      state: password,
      setState: setPassword,
      handleBlur: (e, setError) => {
        if (!validator.isStrongPassword(e.target.value, { minSymbols: 0 })) {
          setError(
            'Password must contain at least one uppercase, one lowercase and one number'
          );
        } else setError('');
      },
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (login) {
      const is2FAEnabled: boolean | undefined = await login({
        email,
        password,
      });
      if (is2FAEnabled !== undefined) {
        if (is2FAEnabled) {
          navigate('/2FA', {
            state: {
              email,
              password,
            },
          });
        } else {
          navigate('/');
        }
      }
    }
  };

  return (
    <Form
      containerClass="log-in-container"
      id="log-in-form"
      title="Log In"
      formElements={formElements}
      submitValue="Log In"
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
