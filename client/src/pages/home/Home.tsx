import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/home.scss';
import { AuthContext } from '../../contexts/AuthContext';

function Home() {
  const authContext = useContext(AuthContext);
  const get2FASecret = authContext?.get2FASecret;
  const disable2FA = authContext?.disable2FA;
  const email = authContext?.email;
  const is2FAEnabled = authContext?.is2FAEnabled || false;

  const navigate = useNavigate();

  const handle2FAEnable = async () => {
    if (typeof email === 'string') {
      if (get2FASecret) {
        const data = await get2FASecret();
        navigate('/2FA', {
          state: {
            secret: data.secret,
          },
        });
      }
    }
  };

  const handle2FADisable = async () => {
    if (typeof email === 'string') {
      if (disable2FA) {
        await disable2FA();
      }
    }
  };

  return (
    <div>
      {email ? (
        <div className="two-factor">
          {is2FAEnabled ? (
            <button
              className="default--button"
              style={{ width: '100px' }}
              id="disable-two-factor"
              onClick={handle2FADisable}
            >
              Disable 2FA
            </button>
          ) : (
            <button
              className="default--button"
              style={{ width: '100px' }}
              id="enable-two-factor"
              onClick={handle2FAEnable}
            >
              Enable 2FA
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Home;
