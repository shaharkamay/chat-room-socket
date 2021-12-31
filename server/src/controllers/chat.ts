import { Socket } from 'socket.io';
import { io } from '../index';
import {  NewMessage } from '../types/message';
// import chatService from '../services/chat';
import { getAllUsers, userJoin, userLeave,getUserByEmail } from '../utils/users';

// const messages:NewMessage[] = [];

const chatController =  (socket: Socket) => {
  console.log('connected to Socket');
  socket.on('join', (email: string) => {
    userJoin(socket.id, email);
    io.emit('onlines', getAllUsers());
  });

  // const messages: Message[] = await chatService.getAllMessages();
  // io.emit('message', message);

  socket.on('message',(newMessage: NewMessage) => {
    // const sentMessage = await chatService.sendMessage(newMessage);
    // messages.push(newMessage);
    
    io.emit('message', newMessage);
  });
  socket.on('direct',(newMessage:NewMessage)=>{
    console.log(getAllUsers());
    console.log(newMessage);
    if(newMessage.direct){
      const user = getUserByEmail(newMessage.direct);
      console.log(user);
      if(user) {
        const socketId = user.socketId;
        console.log(socketId);
        socket.broadcast.to(socketId).emit('message', newMessage);
      }
    }
    
    return;
  });

  socket.on('disconnect', () => {
    userLeave(socket.id);
    console.log(getAllUsers());
    io.emit('onlines', getAllUsers());
    console.log('client disconnected socket');
  });
};

export default chatController;
