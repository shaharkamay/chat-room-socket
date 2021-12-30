import React, { useContext } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { AuthContext } from '../../contexts/AuthContext';
import { Message as MessageType } from '../../types/message';
import { Socket } from 'socket.io-client';

function ChatBox({
  messages,
  socket,
}: {
  messages: MessageType[];
  socket: Socket;
}) {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const email = authContext?.email;

  return (
    <div className="chat__box--container">
      <div className="chat__box">
        <div className="chat__box--messages">
          {messages &&
            messages.map((message, i) => {
              return (
                <Message
                  dir={email === message.email ? 'right' : 'left'}
                  email={message.email}
                  content={message.content}
                  timestamp={new Date(
                    Number(message.timestamp)
                  ).toLocaleString()}
                  key={i}
                />
              );
            })}
        </div>
      </div>
      <SendMessage socket={socket} />
    </div>
  );
}

export default ChatBox;
