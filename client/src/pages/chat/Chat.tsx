import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/chat.scss';
import ChatAside from './ChatAside';
import ChatBox from './ChatBox';
import BASE_URL from '../../index';
import { NewMessage } from '../../types/message';
import io, { Socket } from 'socket.io-client';
import { SocketUser } from '../../types/user';

function Chat() {
  const authContext = useContext(AuthContext);

  const loggedIn = authContext?.loggedIn;

  const email = authContext?.email;

  const [messages, setMessages] = useState<NewMessage[]>([]);

  const [online, setOnline] = useState<SocketUser[]>([]);
  const [sendDirect, setSendDirect] = useState<string>('');

  const socketRef = useRef() as { current: Socket };

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) navigate('/');
  }, [loggedIn]);

  useEffect(() => {
    socketRef.current = io(BASE_URL, {
      transports: ['websocket'],
      path: '/chat',
    });

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join', email);
      console.log('Socket Has Connected');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket Has Been Disconnected');
    });

    socketRef.current.on('message', (newMessage: NewMessage) => {
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      // if(newMessage.direct) setDirect(newMessage.direct);
      setMessages((messages) => [...messages, newMessage]);
    });

    socketRef.current.on('onlines', (online: SocketUser[]) => {
      setOnline(online.filter((user) => user.email !== email));
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat-container row-large">
        <ChatAside
          online={online}
          sendDirect={sendDirect}
          setSendDirect={setSendDirect}
        />
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <ChatBox
          sendDirect={sendDirect}
          messages={messages}
          socket={socketRef.current}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default Chat;
