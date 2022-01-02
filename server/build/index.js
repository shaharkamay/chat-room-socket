"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const http = __importStar(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
// import { Message, NewMessage } from './types/message';
const chat_1 = __importDefault(require("./controllers/chat"));
// import { Message } from './types/message';
const server = http.createServer(app_1.default);
const io = new socket_io_1.default.Server(server, {
    path: '/chat',
});
exports.io = io;
// io.attach(server);
const url = config_1.default.mongo.url;
// const messages: Message[] = [
//   {
//     id: 'dfsd',
//     email: 'nadav@gmail.com',
//     content: 'message1',
//     timestamp: 134462,
//   },
//   {
//     id: 'dfsd2',
//     email: 'nadav2@gmail.com',
//     content: 'message2',
//     timestamp: 1344622,
//   },
// ];
io.on('connection', chat_1.default);
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
mongoose_1.default
    .connect(url, config_1.default.mongo.options)
    .then(() => {
    console.log(`connected to MongoDB`);
    // server.listen(4000, function () {
    //   console.log('listening on port 4000');
    // });
    server.listen(config_1.default.server.port, () => console.log(`app listening at http://localhost:${config_1.default.server.port}`));
})
    .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
});
