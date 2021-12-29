import { Socket } from 'socket.io';
import { io } from '../index';
import { Message, NewMessage } from '../types/message';
// import chatService from '../services/chat';
const messages: Message[] = [];
const chatController = (socket: Socket) => {
  io.emit('message', messages);
  socket.on('message', (newMessage: NewMessage) => {
    console.log(newMessage);
    const message: Message = { ...newMessage, id: 'dksfmlksd' };
    console.log(message);
    messages.push(message);
    io.emit('message', messages);
  });
  console.log('connection socket');
  // socket.emit('message', 'Hello from Socket.io');

  socket.on('disconnect', () => {
    console.log('client disconnected socket');
  });
};

export default chatController;
// import { EventEmitter } from 'events';
// import { NextFunction, Request, Response } from 'express';
// import { NewMessage, Message } from '../types/message';

// const emitter = new EventEmitter();
// let online: string[] = [];

// const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const message: NewMessage = {
//       email: <string>res.locals.user.email,
//       content: <string>req.body.content,
//       timestamp: Date.now(),
//     };
//     const sentMessage = await chatService.sendMessage(message);
//     res.json({ sentMessage });
//     emitter.emit('message', sentMessage);
//   } catch (err) {
//     next(err);
//   }
// };

// const getAllMessages = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const sendOnlineUsers = () => {
//     res.write(`data: ${JSON.stringify({ online })} \n\n`);
//   };

//   try {
//     if (!online.includes(<string>res.locals.user.email)) {
//       online.push(<string>res.locals.user.email);
//     }

//     res.writeHead(200, {
//       'Content-Type': 'text/event-stream',
//       Connection: 'Keep-Alive',
//     });

//     emitter.addListener('online', sendOnlineUsers);
//     emitter.emit('online');

//     const messages: Message[] = await chatService.getAllMessages();

//     res.write(`data: ${JSON.stringify({ messages })} \n\n`);

//     emitter.on('message', (newMessage: Message) => {
//       res.write(`data: ${JSON.stringify({ newMessage })} \n\n`);
//     });

//     req.on('close', () => {
//       online = online.filter(
//         (email) => email !== <string>res.locals.user.email
//       );
//       emitter.emit('online');
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export { sendMessage, getAllMessages };
