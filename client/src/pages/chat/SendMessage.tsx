import React, {
  useState,
  useContext,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Socket } from 'socket.io-client';
import { NewMessage } from '../../types/message';

function SendMessage({
  sendDirect,
  socket,
  setMessages,
  setTyping,
}: {
  sendDirect: string;
  socket: Socket;
  setMessages: Dispatch<SetStateAction<NewMessage[]>>;
  setTyping: Dispatch<SetStateAction<string>>;
}) {
  const authContext = useContext(AuthContext);

  const email = authContext?.email as string;

  const [sendMessage, setSendMessage] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message: NewMessage = {
      email,
      content: sendMessage,
      timestamp: Date.now(),
    };
    if (sendDirect === '') {
      socket.emit('message', message);
    } else {
      message.direct = sendDirect;
      setMessages((messages) => [...messages, message]);
      socket.emit('direct', message);
    }
    setSendMessage('');
    socket.emit('typing', { email, typing: false });
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSendMessage(e.currentTarget.value);
    if (sendDirect === '') {
      if (e.currentTarget.value !== '') {
        socket.emit('typing', { email, typing: true });
        setTyping('');
      } else {
        socket.emit('typing', { email, typing: false });
      }
    } else {
      if (e.currentTarget.value !== '') {
        socket.emit('typing', { email, typing: true, direct: sendDirect });
        setTyping('');
      } else {
        socket.emit('typing', { email, typing: false, direct: sendDirect });
      }
    }
  };

  return (
    <div className="send-message">
      <form className="send-message__form" onSubmit={handleSubmit}>
        <input
          type="text"
          dir="auto"
          placeholder="Type a message"
          value={sendMessage}
          onChange={handleChange}
          className="send-message__input"
        />
        <button className="send-message__button">
          <svg className="send-svg">
            <path
              fill="currentColor"
              d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
