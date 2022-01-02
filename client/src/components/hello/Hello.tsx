import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/hello.scss';

function Hello() {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext?.loggedIn;
  const email = authContext?.email;

  return (
    <div className="hello">
      <div className="hello-container">
        Hello,
        {loggedIn ? ` ${email || 'guest'}` : ` guest`}
      </div>
    </div>
  );
}

export default Hello;
