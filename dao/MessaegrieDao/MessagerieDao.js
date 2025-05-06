const Message = require("../../model/MessagerieModel/MessagerieModel");
const {getUserById}= require ("../../utils/getUser")

const createMessage = async (data) => {
  return await Message.create(data);
};

// const getUserInbox = async (userId, userType) => {
//   return await Message.find({ "receiver.userId": userId, "receiver.userType": userType }).sort({ createdAt: -1 });
// };
const populateUserDetails = async (messages) => {
  return await Promise.all(
    messages.map(async (message) => {
      // Fetch sender details
      const senderDetails = await getUserById(message.sender.userId, message.sender.userType);
      const receiverDetails = await getUserById(message.receiver.userId, message.receiver.userType);

      return {
        ...message.toObject(),
        sender: { ...message.sender, ...senderDetails?._doc },
        receiver: { ...message.receiver, ...receiverDetails?._doc },
      };
    })
  );
};
const populateMessageDetails = async (message) => {
  const senderDetails = await getUserById(message.sender.userId, message.sender.userType);
  const receiverDetails = await getUserById(message.receiver.userId, message.receiver.userType);
  
  let forwardedByDetails = null;
  if (message.forwardedBy?.userId && message.forwardedBy?.userType) {
    const fetchedForwardedBy = await getUserById(message.forwardedBy.userId, message.forwardedBy.userType);
    forwardedByDetails = fetchedForwardedBy?._doc || null;
  }

  return {
    ...message.toObject(),
    sender: { ...message.sender, ...senderDetails?._doc },
    receiver: { ...message.receiver, ...receiverDetails?._doc },
    forwardedBy: message.forwardedBy
      ? { ...message.forwardedBy, ...forwardedByDetails }
      : null,
  };
};
 
const getUserInbox = async (userId, userType) => {
  const messages = await Message.find({
     "receiver.userId": userId,
      "receiver.userType": userType,
      receiverStatus: { $nin: ["archived", "deleted"] },
      deletedBy: { $not: { $elemMatch: { userId, userType } } } // Exclude deleted messages
     }).sort({ createdAt: -1 });
  return populateUserDetails(messages);
};
const getUserArchivedInbox = async (userId, userType) => {
  // console.log("Fetching archived inbox for:", { userId, userType });
  const messages = await Message.find({
     "receiver.userId": userId,
      "receiver.userType": userType,
      receiverStatus: "archived",
      // receiverStatus: { $nin: ["deleted"] },
      deletedBy: { $not: { $elemMatch: { userId, userType } } } 
     }).sort({ createdAt: -1 });
    //  console.log("Fetched Messages:", messages); 
  return populateUserDetails(messages);
};

const getUserSentMessages = async (userId, userType) => {
  const messages = await Message.find({
     "sender.userId": userId, 
     "sender.userType": userType,
     senderStatus: { $nin: ["archived", "deleted"]  }, // Exclude archived messages for the sender
     
     deletedBy: { $not: { $elemMatch: { userId, userType } } } 
    }).sort({ createdAt: -1 });
  return populateUserDetails(messages);
};
const getUserArchivedSentMessages = async (userId, userType) => {
  const messages = await Message.find({
    "sender.userId": userId,
    "sender.userType": userType,
    senderStatus: "archived",
    // receiverStatus: { $nin: ["deleted"] },
    deletedBy: { $not: { $elemMatch: { userId, userType } } } 
  }).sort({ createdAt: -1 });

  return populateUserDetails(messages);
};

const markAsRead = async (messageId) => {
  return await Message.findByIdAndUpdate(messageId, { receiverStatus: "read" }, { new: true });
};
const markAsUnread = async (messageId) => {
  return await Message.findByIdAndUpdate(messageId, { receiverStatus: "unread" }, { new: true });
};
const archiveMessage = async (messageId, userId, userType) => {
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (message.sender.userId.toString() === userId && message.sender.userType === userType) {
    // The user is the sender
    message.senderStatus = "archived";
  } else if (message.receiver.userId.toString() === userId && message.receiver.userType === userType) {
    // The user is the receiver
    message.receiverStatus = "archived";
  } else {
    throw new Error("Unauthorized action");
  }

  return await message.save();
};

const restoreMessage = async (messageId, userId, userType) => {
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (message.sender.userId.toString() === userId && message.sender.userType === userType) {
    // The user is the sender
    message.senderStatus = "sent";
  } else if (message.receiver.userId.toString() === userId && message.receiver.userType === userType) {
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
const deleteMessage = async (messageId, userId, userType) => {
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (message.sender.userId.toString() === userId && message.sender.userType === userType) {
    // The user is the sender
    message.senderStatus = "deleted";
  } else if (message.receiver.userId.toString() === userId && message.receiver.userType === userType) {
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

const getRepliesByMessageId = async (messageId) => {
  const messages = await Message.find({ parentMessageId: messageId }).sort("createdAt");
  return populateUserDetails(messages);
};

const findMessageById = async (messageId) => {
  return await Message.findById(messageId);
};
const markMessageAsDeleted = async (messageId, userId, userType) => {
  return await Message.findByIdAndUpdate(
    messageId,
    { $addToSet: { deletedBy: { userId, userType } } }, 
    { new: true }
  );
};

const findDeletedMessagesForUser = async (userId, userType) => {
 const messages = await Message.find({
    deletedBy: { $elemMatch: { userId, userType } },
    senderStatus: { $nin: ["deleted"] }, // Exclude messages where senderStatus is "deleted"
    receiverStatus: { $nin: ["deleted"] } // Exclude messages where receiverStatus is "deleted"
  }).sort({ createdAt: -1 });
  return populateUserDetails(messages)
};
const transferMessage = async (messageId, newReceiver, forwardedBy) => {
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
  return await populateMessageDetails(savedMessage);
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
  transferMessage
};