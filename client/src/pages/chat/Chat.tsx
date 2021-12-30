import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/chat.scss';
import ChatAside from './ChatAside';
import ChatBox from './ChatBox';
import BASE_URL from '../../index';
import { Message as MessageType } from '../../types/message';
import io, { Socket } from 'socket.io-client';
import { SocketUser } from '../../types/user';

const socket: Socket = io(BASE_URL, {
  transports: ['websocket'],
  path: '/chat',
});
function Chat() {
  const authContext = useContext(AuthContext);

  const loggedIn = authContext?.loggedIn;

  const email = authContext?.email;

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [online, setOnline] = useState<SocketUser[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) navigate('/');
  }, [loggedIn]);

  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ['websocket'],
      path: '/chat',
    });

    socket.on('connect', () => {
      socket.emit('join', email);
      console.log('Socket Has Connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket Has Been Disconnected');
    });

    socket.on('message', (serverMessages: MessageType[]) => {
      setMessages([...serverMessages]);
    });

    socket.on('onlines', (online: SocketUser[]) => {
      console.log(online);
      setOnline(online);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat-container row-large">
        <ChatAside online={online} />
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <ChatBox messages={messages} socket={socket} />
      </div>
    </div>
  );
}

export default Chat;
