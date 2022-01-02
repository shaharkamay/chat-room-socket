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
  typing,
  setTyping,
}: {
  sendDirect: string;
  messages: NewMessage[];
  socket: Socket;
  setMessages: Dispatch<SetStateAction<NewMessage[]>>;
  typing: string;
  setTyping: Dispatch<SetStateAction<string>>;
}) {
  const authContext = useContext(AuthContext);
  const email = authContext?.email;

  return (
    <div className="chat__box--container">
      <div className="chat__box">
        <div className="chat__box--messages">
          {messages &&
            messages.map((message, i) => {
              return (
                <Message
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
        {typing !== '' ? (
          <small className="typing">{typing} is typing...</small>
        ) : (
          ''
        )}
      </div>
      <SendMessage
        sendDirect={sendDirect}
        socket={socket}
        setMessages={setMessages}
        setTyping={setTyping}
      />
    </div>
  );
}

export default ChatBox;
