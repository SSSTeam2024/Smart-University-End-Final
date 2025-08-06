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

      socket.on("register", (userId) => {
        setNewConnectedUser(userId, socket.id);
        console.log(`${userId} registered with socket ${socket.id}`);
      });

      socket.on("join_room", ({ userId, room }) => {
        socket.join(room);
        setNewUserOnRoom(userId, room);
        console.log(`${userId} joined room ${room}`);
      });

      socket.on("leave_room", ({ userId, room }) => {
        socket.leave(room);
        removeUserFromRoom(userId, room);
        console.log(`${userId} left room ${room}`);
      });

      socket.on("chat_open", async ({ userId, chattingWith, not_seen_msg }) => {
        setNewActiveChatsPair(userId, chattingWith);
        console.log(userId + " opened chat");

        // Mark messages from `chattingWith` to `userId` in the same room as seen
        const now = new Date();
        const receiverSocketId = getConnectedUser(chattingWith);

        not_seen_msg.forEach((msg) => {
          // Notify sender about message being seen
          if (receiverSocketId) {
            console.log("receiverSocketId: ", receiverSocketId);
            io.to(receiverSocketId).emit("message_seen", {
              to: userId,
              message: msg.text,
              seenAt: now,
            });
          }
        });
      });

      socket.on("chat_close", ({ userId, chattingWith }) => {
        removeActiveChatsPair(userId);
        console.log(userId + " closed chat");
      });

      socket.on("typing", ({ from, to, room }) => {
        const recipientSocket = getConnectedUser(to);
        if (recipientSocket) {
          io.to(room).emit("user_typing", { from });
        }
      });

      socket.on("disconnect", () => {
        removeUserTempData(socket);
        console.log("User disconnected:", socket.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
