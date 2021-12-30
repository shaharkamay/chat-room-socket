import { Socket } from 'socket.io';
import { io } from '../index';
import { Message, NewMessage } from '../types/message';
import chatService from '../services/chat';
import { getAllUsers, userJoin, userLeave } from '../utils/users';

const chatController = async (socket: Socket) => {
  console.log('connected to Socket');
  socket.on('join', (email: string) => {
    userJoin(socket.id, email);

    io.emit('onlines', getAllUsers());
  });

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
