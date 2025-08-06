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
    try {
      users.set(userId, socketId);
    } catch (error) {
      console.log("Socket: Error setting new connected user!: ", error);
    }
  },

  getConnectedUser: (userId) => {
    try {
      return users.get(userId);
    } catch (error) {
      console.log("Socket: Error getting connected user!: ", error);
    }
  },

  setNewUserOnRoom: (userId, room) => {
    try {
      if (!rooms.has(room)) {
        rooms.set(room, { users: new Set() });
      }
      rooms.get(room).users.add(userId);
    } catch (error) {
      console.log(
        "Socket: Error setting new room or new user inside room!: ",
        error
      );
    }
  },

  removeUserFromRoom: (userId, room) => {
    try {
      rooms.get(room).users.delete(userId);
    } catch (error) {
      console.log("Socket: Error deleting user from room!: ", error);
    }
  },

  setNewActiveChatsPair: (userId, chattingWith) => {
    try {
      activeChats.set(userId, chattingWith);
      console.log("Active chats: ", activeChats);
    } catch (error) {
      console.log("Socket: Error setting user on active chats!: ", error);
    }
  },

  removeActiveChatsPair: (userId) => {
    try {
      activeChats.delete(userId);
    } catch (error) {
      console.log("Socket: Error deleting user from active chats!: ", error);
    }
  },

  getActiveChatsPair: (userId) => {
    try {
      return activeChats.get(userId);
    } catch (error) {
      console.log("Socket: Error getting user from active chats!: ", error);
    }
  },

  removeUserTempData: (socket) => {
    try {
      for (let [userId, sockId] of users.entries()) {
        if (sockId === socket.id) {
          users.delete(userId);
          activeChats.delete(userId);
          break;
        }
      }
    } catch (error) {
      console.log("Socket: Error removing user's temp data!: ", error);
    }
  },
};
