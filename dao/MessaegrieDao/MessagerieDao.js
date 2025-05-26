const MessageSchema = require("../../model/MessagerieModel/MessagerieModel");
const { getUserByIdV1 } = require("../../utils/getUser");

function getMessageModel(dbConnection) {
  return (
    dbConnection.models.Message || dbConnection.model("Message", MessageSchema)
  );
}

const createMessage = async (data, dbName) => {
  const Message = await getMessageModel(dbName);
  return await Message.create(data);
};

// const getUserInbox = async (userId, userType) => {
//   return await Message.find({ "receiver.userId": userId, "receiver.userType": userType }).sort({ createdAt: -1 });
// };
const populateUserDetails = async (messages, dbName) => {
  return await Promise.all(
    messages.map(async (message) => {
      // Fetch sender details
      const senderDetails = await getUserByIdV1(
        message.sender.userId,
        message.sender.userType,
        dbName
      );
      // Fetch receiver details for each receiver in the array
      const receiversWithDetails = await Promise.all(
        message.receivers.map(async (receiver) => {
          const details = await getUserByIdV1(
            receiver.userId,
            receiver.userType,
            dbName
          );
          return { ...receiver.toObject?.() ?? receiver, ...details };
        })
      );

      return {
        ...message.toObject(),
        sender: { ...message.sender, ...senderDetails },
        receivers: receiversWithDetails,
      };
    })
  );
};
const populateMessageDetails = async (message, dbName) => {
  const senderDetails = await getUserByIdV1(
    message.sender.userId,
    message.sender.userType,
    dbName
  );
  const receiverDetails = await getUserByIdV1(
    message.receiver.userId,
    message.receiver.userType,
    dbName
  );

  let forwardedByDetails = null;
  if (message.forwardedBy?.userId && message.forwardedBy?.userType) {
    const fetchedForwardedBy = await getUserByIdV1(
      message.forwardedBy.userId,
      message.forwardedBy.userType,
      dbName
    );
    forwardedByDetails = fetchedForwardedBy || null;
  }

  return {
    ...message.toObject(),
    sender: { ...message.sender, ...senderDetails},
    receiver: { ...message.receiver, ...receiverDetails},
    forwardedBy: message.forwardedBy
      ? { ...message.forwardedBy, ...forwardedByDetails }
      : null,
  };
};

// const getUserInbox = async (userId, userType, dbName) => {
//   const Message = await getMessageModel(dbName);
//   const messages = await Message.find({
//     receivers: {
//       $elemMatch: {
//         userId: userId,
//         userType: userType,
//         status: { $nin: ["archived", "deleted"] },
//       },
//     },
//     deletedBy: { $not: { $elemMatch: { userId, userType } } }, // Exclude deleted messages
//   }).sort({ createdAt: -1 });
//   return populateUserDetails(messages, dbName);
// };
const getUserInbox = async (userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const messages = await Message.find({
    receivers: {
      $elemMatch: {
        userId: userId,
        userType: userType,
        status: { $nin: ["archived", "deleted"] },
      },
    },
    deletedBy: {
      $not: {
        $elemMatch: {
          userId: userId,
          userType: userType,
        },
      },
    },
  }).sort({ createdAt: -1 });
  

  return populateUserDetails(messages, dbName);
};

const getUserArchivedInbox = async (userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  // console.log("Fetching archived inbox for:", { userId, userType });
  const messages = await Message.find({
    // "receiver.userId": userId,
    // "receiver.userType": userType,
    // receiverStatus: "archived",
    // receiverStatus: { $nin: ["deleted"] },
      receivers: {
      $elemMatch: {
        userId: userId,
        userType: userType,
        status: "archived",
        status: { $nin: ["deleted"] },
      },
    },
    deletedBy: { $not: { $elemMatch: { userId, userType } } },
  }).sort({ createdAt: -1 });
  //  console.log("Fetched Messages:", messages);
  return populateUserDetails(messages, dbName);
};

const getUserSentMessages = async (userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const messages = await Message.find({
    "sender.userId": userId,
    "sender.userType": userType,
    senderStatus: { $nin: ["archived", "deleted"] }, // Exclude archived messages for the sender

    deletedBy: { $not: { $elemMatch: { userId, userType } } },
  }).sort({ createdAt: -1 });
  return populateUserDetails(messages, dbName);
};
const getUserArchivedSentMessages = async (userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const messages = await Message.find({
    "sender.userId": userId,
    "sender.userType": userType,
    senderStatus: "archived",
    // receiverStatus: { $nin: ["deleted"] },
    deletedBy: { $not: { $elemMatch: { userId, userType } } },
  }).sort({ createdAt: -1 });

  return populateUserDetails(messages, dbName);
};

const markAsRead = async (messageId, dbName) => {
  const Message = await getMessageModel(dbName);
  return await Message.findByIdAndUpdate(
    messageId,
    // { receiverStatus: "read" },
    {receivers: {
      $elemMatch: {
        userId: userId,
        userType: userType,
        status: "read",
      },
    },},
    { new: true }
  );
};
const markAsUnread = async (messageId, dbName) => {
  const Message = await getMessageModel(dbName);
  return await Message.findByIdAndUpdate(
    messageId,
    // { receiverStatus: "unread" },
    { receivers: {
      $elemMatch: {
        userId: userId,
        userType: userType,
        status: "unread",
       
      },
    },},
    { new: true }
  );
};
const archiveMessage = async (messageId, userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (
    message.sender.userId.toString() === userId &&
    message.sender.userType === userType
  ) {
    // The user is the sender
    message.senderStatus = "archived";
  } else if (
    message.receiver.userId.toString() === userId &&
    message.receiver.userType === userType
  ) {
    // The user is the receiver
    message.receiverStatus = "archived";
  } else {
    throw new Error("Unauthorized action");
  }

  return await message.save();
};

const restoreMessage = async (messageId, userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (
    message.sender.userId.toString() === userId &&
    message.sender.userType === userType
  ) {
    // The user is the sender
    message.senderStatus = "sent";
  } else if (
    message.receiver.userId.toString() === userId &&
    message.receiver.userType === userType
  ) {
    // The user is the receiver
    message.receiverStatus = "unread";
  } else {
    throw new Error("Unauthorized action");
  }

  return await message.save();
};

// const deleteMessage = async (messageId) => {
//   return await Message.findByIdAndDelete(messageId);
// };
const deleteMessage = async (messageId, userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (
    message.sender.userId.toString() === userId &&
    message.sender.userType === userType
  ) {
    // The user is the sender
    message.senderStatus = "deleted";
  } else if (
    message.receiver.userId.toString() === userId &&
    message.receiver.userType === userType
  ) {
    // The user is the receiver
    message.receiverStatus = "deleted";
  } else {
    throw new Error("Unauthorized action");
  }

  return await message.save();
};

// const getRepliesByMessageId = async (messageId) => {
//   try {
//     return await Message.find({ parentMessageId: messageId }).sort("createdAt");
//   } catch (error) {
//     throw new Error("Erreur lors de la récupération des réponses.");
//   }
// };

const getRepliesByMessageId = async (messageId, dbName) => {
  const Message = await getMessageModel(dbName);
  const messages = await Message.find({ parentMessageId: messageId }).sort(
    "createdAt"
  );
  return populateUserDetails(messages, dbName);
};

const findMessageById = async (messageId, dbName) => {
  const Message = await getMessageModel(dbName);
  return await Message.findById(messageId);
};
const markMessageAsDeleted = async (messageId, userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  return await Message.findByIdAndUpdate(
    messageId,
    { $addToSet: { deletedBy: { userId, userType } } },
    { new: true }
  );
};

const findDeletedMessagesForUser = async (userId, userType, dbName) => {
  const Message = await getMessageModel(dbName);
  const messages = await Message.find({
    deletedBy: { $elemMatch: { userId, userType } },
    senderStatus: { $nin: ["deleted"] }, // Exclude messages where senderStatus is "deleted"
    receiverStatus: { $nin: ["deleted"] }, // Exclude messages where receiverStatus is "deleted"
  }).sort({ createdAt: -1 });
  return populateUserDetails(messages, dbName);
};
const transferMessage = async (messageId, newReceiver, forwardedBy, dbName) => {
  const Message = await getMessageModel(dbName);
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  message.receiver = {
    userId: newReceiver.userId,
    userType: newReceiver.userType,
  };

  message.receiverStatus = "unread";
  message.forwardedBy = {
    userId: forwardedBy.userId,
    userType: forwardedBy.userType,
  };
  message.transferredAt = new Date();

  const savedMessage = await message.save();
  return await populateMessageDetails(savedMessage, dbName);
};
module.exports = {
  createMessage,
  getUserInbox,
  getUserArchivedInbox,
  getUserSentMessages,
  getUserArchivedSentMessages,
  markAsRead,
  markAsUnread,
  archiveMessage,
  deleteMessage,
  getRepliesByMessageId,
  markMessageAsDeleted,
  findMessageById,
  restoreMessage,
  // getUserDeletedSentMessages,
  // getUserDeletedInboxMessages
  findDeletedMessagesForUser,
  transferMessage,
};
