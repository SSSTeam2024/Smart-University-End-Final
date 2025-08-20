const {
  setNewConnectedUser,
  setNewUserOnRoom,
  removeUserFromRoom,
  setNewActiveChatsPair,
  getConnectedUser,
  removeActiveChatsPair,
  removeUserTempData,
  getIO,
} = require("./ioInstance");

module.exports = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("student_register", (userId) => {
        setNewConnectedUser(userId, socket.id, "student");
        console.log(`${userId} student registered with socket ${socket.id}`);
      });

      socket.on("teacher_register", (userId) => {
        setNewConnectedUser(userId, socket.id, "teacher");
        console.log(`${userId} teacher registered with socket ${socket.id}`);
      });

      socket.on("student_join_room", ({ userId, room }) => {
        socket.join(room);
        setNewUserOnRoom(userId, room, "student");
        console.log(`${userId} student joined room ${room}`);
      });

      socket.on("teacher_join_room", ({ userId, room }) => {
        socket.join(room);
        setNewUserOnRoom(userId, room, "teacher");
        console.log(`${userId} teacher joined room ${room}`);
      });

      socket.on("student_leave_room", ({ userId, room }) => {
        socket.leave(room);
        removeUserFromRoom(userId, room, "student");
        console.log(`${userId} student left room ${room}`);
      });

      socket.on("teacher_leave_room", ({ userId, room }) => {
        socket.leave(room);
        removeUserFromRoom(userId, room, "teacher");
        console.log(`${userId} teacher left room ${room}`);
      });

      socket.on(
        "student_chat_open",
        ({ userId, chattingWith, not_seen_msg }) => {
          setNewActiveChatsPair(userId, chattingWith, "student");
          console.log(userId + " student opened chat");

          // Mark messages from `chattingWith` to `userId` in the same room as seen
          const now = new Date();
          const receiverSocketId = getConnectedUser(chattingWith, "student");

          not_seen_msg.forEach((msg) => {
            // Notify sender about message being seen
            if (receiverSocketId) {
              io.to(receiverSocketId).emit("student_message_seen", {
                to: userId,
                message: msg.text,
                seenAt: now,
              });
            }
          });
        }
      );

      socket.on(
        "teacher_chat_open",
        ({ userId, chattingWith, not_seen_msg }) => {
          setNewActiveChatsPair(userId, chattingWith, "teacher");
          console.log(userId + " teacher opened chat");

          // Mark messages from `chattingWith` to `userId` in the same room as seen
          const now = new Date();
          const receiverSocketId = getConnectedUser(chattingWith, "teacher");

          not_seen_msg.forEach((msg) => {
            // Notify sender about message being seen
            if (receiverSocketId) {
              io.to(receiverSocketId).emit("teacher_message_seen", {
                to: userId,
                message: msg.text,
                seenAt: now,
              });
            }
          });
        }
      );

      socket.on("student_chat_close", ({ userId, chattingWith }) => {
        removeActiveChatsPair(userId, "student");
        console.log(userId + " closed chat");
      });

      socket.on("teacher_chat_close", ({ userId, chattingWith }) => {
        removeActiveChatsPair(userId, "teacher");
        console.log(userId + " closed chat");
      });

      socket.on("student_typing", ({ from, to, room }) => {
        const recipientSocket = getConnectedUser(to, "student");
        if (recipientSocket) {
          io.to(room).emit("student_user_typing", { from });
        }
      });

      socket.on("teacher_typing", ({ from, to, room }) => {
        const recipientSocket = getConnectedUser(to, "teacher");
        if (recipientSocket) {
          io.to(room).emit("teacher_user_typing", { from });
        }
      });

      socket.on("disconnect", () => {
        const whoDisconnected = removeUserTempData(socket);
        console.log(whoDisconnected + " user disconnected: ", socket.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
