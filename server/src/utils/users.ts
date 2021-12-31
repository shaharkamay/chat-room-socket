import { SocketUser } from '../types/user';

const users: SocketUser[] = [];

// Join user to chat
function userJoin(socketId: string, email: string) {
  const user: SocketUser = { socketId, email };

  if (email && !users.find((user) => user.email === email)) {
    users.push(user);
  }

  return user;
}

// Get current user
function getCurrentUser(socketId: string): SocketUser | undefined {
  return users.find((user) => user.socketId === socketId);
}

// Get userByEmail
function getUserByEmail(email: string): SocketUser | undefined {
  return users.find((user) => user.email === email);
}

// User leaves chat
function userLeave(socketId: string) {
  const index = users.findIndex((user) => user.socketId === socketId);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getAllUsers() {
  return users;
}

// // Get room users
// function getRoomUsers(room) {
//   return users.filter(user => user.room === room);
// }

export {
  userJoin,
  getCurrentUser,
  userLeave,
  getAllUsers,
  getUserByEmail
  // getRoomUsers
};
