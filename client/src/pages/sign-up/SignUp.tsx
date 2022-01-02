import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/form/Form';
import '../../assets/styles/sign-up.scss';
import validator from 'validator';
import { FormElementType } from '../../types/form';

function SignUp() {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext?.loggedIn;
  const signUp = authContext?.signUp;

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  const formElements: FormElementType[] = [
    {
      labelValue: 'First Name',
      type: 'text',
      id: 'first-name',
      placeholder: 'Enter first name',
      state: firstName,
      setState: setFirstName,
      handleBlur: (e, setError) => {
        if (!validator.isAlpha(e.target.value)) {
          setError('Invalid name');
        } else setError('');
      },
    },
    {
      labelValue: 'Last Name',
      type: 'text',
      id: 'last-name',
      placeholder: 'Enter last name',
      state: lastName,
      setState: setLastName,
      handleBlur: (e, setError) => {
        if (!validator.isAlpha(e.target.value)) {
          setError('Invalid name');
        } else setError('');
      },
    },
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
    if (signUp) {
      const data = await signUp({ firstName, lastName, email, password });
      if (data) {
        if (data.isSignedUp) navigate('/login');
      }
    }
  };

  return (
    <Form
      containerClass="sign-up-container"
      id="sign-up-form"
      title="Sign Up"
      formElements={formElements}
      submitValue="Sign Up"
      handleSubmit={handleSubmit}
    />
  );
}

export default SignUp;
