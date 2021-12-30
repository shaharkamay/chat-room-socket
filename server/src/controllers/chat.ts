import { Socket } from 'socket.io';
import { io } from '../index';
import { Message, NewMessage } from '../types/message';
import chatService from '../services/chat';
import { getAllUsers, userJoin, userLeave } from '../utils/users';
import { SocketUser } from '../types/user';

// const onlines: SocketUser[] = [];

const chatController = async (socket: Socket) => {
  console.log('connected to Socket');
  socket.on('join', (email) => {
    userJoin(socket.id, email);

    // onlines.push(user);

    io.emit('onlines', getAllUsers());
  });
  // socket.on('onlines', (email: string) => {
  //   console.log(email);
  //   if (email) {
  //     if (!onlines.includes(email)) {
  //       onlines.push(email);
  //     }
  //   }

  // });

  const messages: Message[] = await chatService.getAllMessages();
  io.emit('message', messages);

  socket.on('message', async (newMessage: NewMessage) => {
    const sentMessage = await chatService.sendMessage(newMessage);
    messages.push(sentMessage);
    io.emit('message', messages);
  });

  socket.on('disconnect', () => {
    userLeave(socket.id);
    io.emit('onlines', getAllUsers());
    console.log('client disconnected socket');
  });
};

export default chatController;
