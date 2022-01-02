import React, { useContext } from 'react';
import Item from './Item';
import { AuthContext } from '../../../contexts/AuthContext';

function List() {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext?.loggedIn;
  const logout = authContext?.logout;

  return (
    <ul className="nav__list row">
      <Item linkName="Home" link="/" />
      {loggedIn
        ? [
            <Item linkName="Chat Room" link="/chat" key="chat" />,
            <button
              className="default--button"
              onClick={async () => {
                if (logout) {
                  await logout();
                }
              }}
              style={{ backgroundColor: 'red', padding: '.1em .5em' }}
              key="logout"
            >
              Logout
            </button>,
          ]
        : [
            <Item linkName="Login" link="/login" key="login" />,
            <Item linkName="Sign Up" link="/sign-up" key="sign-up" />,
          ]}
    </ul>
  );
}

export default List;
