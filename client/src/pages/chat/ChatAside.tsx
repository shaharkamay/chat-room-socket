import React, { Dispatch, SetStateAction } from 'react';
// import { Socket } from 'socket.io-client';
import { SocketUser } from '../../types/user';

function ChatAside({ online,setSendDirect,sendDirect }: { online: SocketUser[] ,setSendDirect:Dispatch<SetStateAction<string>>,sendDirect:string}) {
  return (
    <aside className="chat__aside">
      {
        sendDirect !== ""
        ? <div onClick={() => setSendDirect('')} className="aside__user default--button">
        <div className="aside__user--email">
          Send To Everyone
        </div>
      </div>
      : ''
      
      
      }
      {online.map(({ email }, i) => {
        return (
          <div 
            onClick={()=> setSendDirect(email)}
            className={`aside__user ${sendDirect === email ? 'aside__user--active' : ''}`} 
            key={`aside__user${i}`}
          >
            <div className="online-circle" key={`online-circle${i}`}></div>
            <div className="aside__user--email" key={`aside__user--email${i}`}>
              {email}
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default ChatAside;
