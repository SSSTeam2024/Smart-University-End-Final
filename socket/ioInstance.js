
// In-memory DB
let io = null;
const users = new Map(); // userId -> socketId
const activeChats = new Map(); // userId -> chattingWith
const rooms = new Map(); // 
/* [
  [
    "room1",
    {
      users: new Set(["67b87c0e62cf56e785f8bf8b", "67b87c0e62cf56e785f8bf8f"]),
    },
  ],
] */

module.exports = {
  init: (httpServer) => {
    const { Server } = require("socket.io");
    io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },

  setNewConnectedUser: (userId, socketId) => {
    users.set(userId, socketId);
  },

  getConnectedUser: (userId) => {
    users.get(userId);
  },

  setNewUserOnRoom: (userId, room) => {
    if (!rooms.has(room)) {
      rooms.set(room, { users: new Set() });
    }
    rooms.get(room).users.add(userId);
  },

  removeUserFromRoom: (userId, room) => {
    rooms.get(room).users.delete(userId);
  },

  setNewActiveChatsPair: (userId, chattingWith) => {
    activeChats.set(userId, chattingWith);
  },

  removeActiveChatsPair: (userId) => {
    activeChats.delete(userId);
  },

  getActiveChatsPair: (userId) => {
    activeChats.get(userId);
  },

  removeUserTempData: (socket) => {
    for (let [userId, sockId] of users.entries()) {
      if (sockId === socket.id) {
        users.delete(userId);
        activeChats.delete(userId);
        break;
      }
    }
  },

};
