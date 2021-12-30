import app from './app';
import mongoose from 'mongoose';
import config from './config/config';
import * as http from 'http';
import socketIo from 'socket.io';
// import { Message, NewMessage } from './types/message';
import chatController from './controllers/chat';
// import { Message } from './types/message';

const server = http.createServer(app);
const io = new socketIo.Server(server, {
  path: '/chat',
});
// io.attach(server);

const url = config.mongo.url;

// console.log(url);


io.on('connection', chatController);

// io.on('connection', (socket: Socket) => {
//   io.emit('message', messages);
//   socket.on('message', (newMessage: NewMessage) => {
//     console.log(newMessage);
//     const message: Message = { ...newMessage, id: 'dksfmlksd' };
//     console.log(message);
//     messages.push(message);
//     io.emit('message', messages);
//   });
//   console.log('connection socket');
//   // socket.emit('message', 'Hello from Socket.io');

//   socket.on('disconnect', () => {
//     console.log('client disconnected socket');
//   });
// });

mongoose
  .connect(url, config.mongo.options)
  .then(() => {
    console.log(`connected to MongoDB`);
    // server.listen(4000, function () {
    //   console.log('listening on port 4000');
    // });
    server.listen(config.server.port, () =>
      console.log(`app listening at http://localhost:${config.server.port}`)
    );
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

export { io };
