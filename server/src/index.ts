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



io.on('connection', chatController);



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
