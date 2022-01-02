"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// import chatService from '../services/chat';
const users_1 = require("../utils/users");
// const messages:NewMessage[] = [];
const chatController = (socket) => {
    console.log('connected to Socket');
    socket.on('join', (email) => {
        (0, users_1.userJoin)(socket.id, email);
        index_1.io.emit('onlines', (0, users_1.getAllUsers)());
    });
    // const messages: Message[] = await chatService.getAllMessages();
    // io.emit('message', message);
    socket.on('message', (newMessage) => {
        // const sentMessage = await chatService.sendMessage(newMessage);
        // messages.push(newMessage);
        index_1.io.emit('message', newMessage);
    });
    socket.on('direct', (newMessage) => {
        console.log('DIRECT');
        if (newMessage.direct) {
            const user = (0, users_1.getUserByEmail)(newMessage.direct);
            console.log(user);
            if (user) {
                const socketId = user.socketId;
                console.log(socketId);
                socket.broadcast.to(socketId).emit('message', newMessage);
            }
        }
        return;
    });
    socket.on('disconnect', () => {
        (0, users_1.userLeave)(socket.id);
        console.log((0, users_1.getAllUsers)());
        index_1.io.emit('onlines', (0, users_1.getAllUsers)());
        console.log('client disconnected socket');
    });
};
exports.default = chatController;
