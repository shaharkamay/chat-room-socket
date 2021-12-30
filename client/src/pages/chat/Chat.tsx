import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/chat.scss';
import ChatAside from './ChatAside';
import ChatBox from './ChatBox';
import BASE_URL from '../../index';
import { Message as MessageType } from '../../types/message';
import io, { Socket } from 'socket.io-client';
import { SocketUser } from '../../types/user';

function Chat() {
  const authContext = useContext(AuthContext);

  const loggedIn = authContext?.loggedIn;

  const email = authContext?.email;

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [online, setOnline] = useState<SocketUser[]>([]);

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

    socketRef.current.on('message', (serverMessages: MessageType[]) => {
      setMessages([...serverMessages]);
    });

    socketRef.current.on('onlines', (online: SocketUser[]) => {
      setOnline(online);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat-container row-large">
        <ChatAside online={online} />
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <ChatBox messages={messages} socket={socketRef.current} />
      </div>
    </div>
  );
}

export default Chat;
