// In-memory DB
let io = null;
let connectedStudents = new Map(); // studentId -> socketId
let connectedTeachers = new Map(); // teacherId -> socketId
let studentsActiveChats = new Map(); // studentId -> chattingWith
let teachersActiveChats = new Map(); // teacherId -> chattingWith
let studentsRooms = new Map(); //
/* [
  [
    "room1",
    {
      students: new Set(["67b87c0e62cf56e785f8bf8b", "67b87c0e62cf56e785f8bf8f"]),
    },
  ],
] */
let teachersRooms = new Map(); //
/* [
    [
      "room1",
      {
        teachers: new Set(["67b87c0e62cf56e785f8bf8b", "67b87c0e62cf56e785f8bf8f"]),
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

  setNewConnectedUser: (userId, socketId, userType) => {
    try {
      switch (userType) {
        case "student":
          connectedStudents.set(userId, socketId);
          break;
        case "teacher":
          connectedTeachers.set(userId, socketId);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(
        "Socket: Error setting new connected user!" + userType + ": ",
        error
      );
    }
  },

  getConnectedUser: (userId, userType) => {
    try {
      let user;
      switch (userType) {
        case "student":
          user = connectedStudents.get(userId);
          break;
        case "teacher":
          user = connectedTeachers.get(userId);
          break;
        default:
          break;
      }
      console.log(user);
      return user;
    } catch (error) {
      console.log(
        "Socket: Error getting connected user!" + userType + ": ",
        error
      );
    }
  },

  setNewUserOnRoom: (userId, room, userType) => {
    try {
      switch (userType) {
        case "student":
          if (!studentsRooms.has(room)) {
            studentsRooms.set(room, { students: new Set() });
          }
          studentsRooms.get(room).students.add(userId);
          break;
        case "teacher":
          if (!teachersRooms.has(room)) {
            teachersRooms.set(room, { teachers: new Set() });
          }
          teachersRooms.get(room).teachers.add(userId);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(
        "Socket: Error setting new room or new user inside room!: ",
        error
      );
    }
  },

  removeUserFromRoom: (userId, room, userType) => {
    try {
      switch (userType) {
        case "student":
          studentsRooms.get(room).students.delete(userId);
          break;
        case "teacher":
          teachersRooms.get(room).teachers.delete(userId);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(
        "Socket: Error deleting user " + userType + " from room!: ",
        error
      );
    }
  },

  setNewActiveChatsPair: (userId, chattingWith, userType) => {
    try {
      switch (userType) {
        case "student":
          studentsActiveChats.set(userId, chattingWith);
          break;
        case "teacher":
          teachersActiveChats.set(userId, chattingWith);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(
        "Socket: Error setting user " + userType + " on active chats!: ",
        error
      );
    }
  },

  removeActiveChatsPair: (userId, userType) => {
    try {
      switch (userType) {
        case "student":
          studentsActiveChats.delete(userId);
          break;
        case "teacher":
          teachersActiveChats.delete(userId);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(
        "Socket: Error deleting user " + userType + " from active chats!: ",
        error
      );
    }
  },

  getActiveChatsPair: (userId, userType) => {
    try {
      let chatPair;
      switch (userType) {
        case "student":
          chatPair = studentsActiveChats.get(userId);
          break;
        case "teacher":
          chatPair = teachersActiveChats.get(userId);
          break;
        default:
          break;
      }
      return chatPair;
    } catch (error) {
      console.log(
        "Socket: Error getting user " + userType + " from active chats!: ",
        error
      );
    }
  },

  removeUserTempData: (socket) => {
    try {
      let userType = "teacher";
      for (let [userId, sockId] of connectedStudents.entries()) {
        if (sockId === socket.id) {
          userType = "student";
          connectedStudents.delete(userId);
          studentsActiveChats.delete(userId);
          break;
        }
      }

      if (userType === "teacher") {
        for (let [userId, sockId] of connectedTeachers.entries()) {
          if (sockId === socket.id) {
            connectedTeachers.delete(userId);
            teachersActiveChats.delete(userId);
            break;
          }
        }
      }
      return userType;
    } catch (error) {
      console.log(
        "Socket: Error removing user " + userType + " temp data!: ",
        error
      );
    }
  },
};
