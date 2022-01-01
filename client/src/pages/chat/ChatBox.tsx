import React, { Dispatch, SetStateAction, useContext } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { AuthContext } from '../../contexts/AuthContext';
import { NewMessage } from '../../types/message';
import { Socket } from 'socket.io-client';

function ChatBox({
  sendDirect,
  messages,
  socket,
  setMessages,
}: {
  sendDirect: string;
  messages: NewMessage[];
  socket: Socket;
  setMessages: Dispatch<SetStateAction<NewMessage[]>>;
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
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  direct={message.direct || ''}
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
      <SendMessage
        sendDirect={sendDirect}
        socket={socket}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatBox;
