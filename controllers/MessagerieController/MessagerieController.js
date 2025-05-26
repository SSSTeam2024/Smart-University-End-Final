const messageService = require("../../dao/MessaegrieDao/MessagerieDao");
const messageServices = require("../../services/MessagerieServices/MessagerieServices");
const globalFunctions = require("../../utils/globalFunctions");
const { getDb } = require("../../config/dbSwitcher");
const { getUserByIdV2 } = require("../../utils/getUser");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

// const sendMessage = async (req, res) => {
//   try {
//     const { sender, receiver, subject, content, attachments } = req.body;
//     const message = await messageService.createMessage({ sender, receiver, subject, content, attachments });
//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message", details: error.message });
//   }
// };

// const sendMessage = async (req, res) => {
//   try {
//     const { sender, receiver, subject, content, attachmentsBase64Strings,attachmentsExtensions, parentMessageId   } = req.body;

//     const attachementsPath = 'files/messagerieFiles/';
//     const attachementsFilenames  = attachmentsExtensions.map((ext, index) =>
//           globalFunctions.generateUniqueFilename(ext, `MessagerieFiles_${index}`)
//         );

//         let documents = [...attachmentsBase64Strings.map((base64String, index) => ({
//           base64String: base64String,
//           extension: attachmentsExtensions[index],
//           name: attachementsFilenames[index],
//           path: attachementsPath
//         }))]
//     const message = await messageServices.createMessage({ sender, receiver, subject, content, attachments: attachementsFilenames,   parentMessageId: parentMessageId || null },documents);

//     // Fetch sender and receiver details
//     const senderDetails = await getUserById(sender.userId, sender.userType);
//     const receiverDetails = await getUserById(receiver.userId, receiver.userType);

//     res.status(201).json({
//       ...message.toObject(),
//       sender: { ...sender, ...senderDetails?._doc },
//       receiver: { ...receiver, ...receiverDetails?._doc },
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message", details: error.message });
//   }
// };

const sendMessage = async (req, res) => {
  try {
    const {
      sender,
      receivers,
      subject,
      content,
      attachmentsBase64Strings,
      attachmentsExtensions,
      parentMessageId,
    } = req.body;

    // Validate attachments
    if (
      attachmentsBase64Strings.length !== attachmentsExtensions.length
    ) {
      return res.status(400).json({
        error: "Mismatch between attachment data and extensions.",
      });
    }

    const attachmentsPath = "files/messagerieFiles/";
    const attachmentsFilenames = attachmentsExtensions.map((ext, index) =>
      globalFunctions.generateUniqueFilename(ext, `MessagerieFiles_${index}`)
    );

    const documents = attachmentsBase64Strings.map((base64String, index) => ({
      base64String,
      extension: attachmentsExtensions[index],
      name: attachmentsFilenames[index],
      path: attachmentsPath,
    }));

    // Inject 'status: unread' into each receiver object
    const receiversWithStatus = receivers.map((r) => ({
      ...r,
      status: "unread",
    }));

    const message = await messageServices.createMessage(
      {
        sender,
        receivers: receiversWithStatus,
        subject,
        content,
        attachments: attachmentsFilenames,
        parentMessageId: parentMessageId || null,
      },
      documents,
      useNewDb(req)
    );

    const senderDetails = await getUserByIdV2(
      sender.userId,
      sender.userType,
      useNewDb(req)
    );

    const receiversWithDetails = await Promise.all(
      receiversWithStatus.map(async (r) => {
        const details = await getUserByIdV2(r.userId, r.userType, useNewDb(req));
        return { ...r, ...details };
      })
    );

    res.status(201).json({
      ...message.toObject(),
      sender: { ...sender, ...senderDetails },
      receivers: receiversWithDetails,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      error: "Failed to send message",
      details: error.message,
    });
  }
};


const fetchReplies = async (req, res) => {
  const { messageId } = req.params;
  const db = await getDb(useNewDb(req));
  try {
    const replies = await messageService.getRepliesByMessageId(messageId, db);
    return res.status(200).json(replies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const getInbox = async (req, res) => {
//   try {
//     const { userId, userType } = req.params;
//     const messages = await messageService.getUserInbox(userId, userType);
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch inbox", details: error.message });
//   }
// };
const getInbox = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { userId, userType } = req.params;
    const messages = await messageService.getUserInbox(userId, userType, db);
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch inbox", details: error.message });
  }
};
const getArchivedInbox = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { userId, userType } = req.params;
    const messages = await messageService.getUserArchivedInbox(
      userId,
      userType,
      db
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch archived inbox",
      details: error.message,
    });
  }
};

// const getSentMessages = async (req, res) => {
//   try {
//     const { userId, userType } = req.params;
//     const messages = await messageService.getUserSentMessages(userId, userType);
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch sent messages", details: error.message });
//   }
// };
const getSentMessages = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { userId, userType } = req.params;
    const messages = await messageService.getUserSentMessages(
      userId,
      userType,
      db
    );
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch sent messages", details: error.message });
  }
};
const getArchivedSentMessages = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { userId, userType } = req.params;
    const messages = await messageService.getUserArchivedSentMessages(
      userId,
      userType,
      db
    );
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch archived messages",
        details: error.message,
      });
  }
};

const markMessageAsRead = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const message = await messageService.markAsRead(req.params.messageId, db);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      error: "Failed to mark message as read",
      details: error.message,
    });
  }
};
const markMessageAsUnread = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const message = await messageService.markAsUnread(req.params.messageId, db);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      error: "Failed to mark message as unread",
      details: error.message,
    });
  }
};

const archiveMessage = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { messageId } = req.params;
    const { userId, userType } = req.body;

    const updatedMessage = await messageService.archiveMessage(
      messageId,
      userId,
      userType,
      db
    );
    res
      .status(200)
      .json({ message: "Message archived successfully", updatedMessage });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to archive message", details: error.message });
  }
};
const restoreMessage = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { messageId } = req.params;
    const { userId, userType } = req.body;

    const updatedMessage = await messageService.restoreMessage(
      messageId,
      userId,
      userType,
      db
    );
    res
      .status(200)
      .json({ message: "Message restored successfully", updatedMessage });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to restore message", details: error.message });
  }
};

// const deleteMessage = async (req, res) => {
//   try {
//     await messageService.deleteMessage(req.params.messageId);
//     res.status(200).json({ message: "Message deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete message", details: error.message });
//   }
// };
const deleteMessage = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { messageId } = req.params;
    const { userId, userType } = req.body; // Get the user who is archiving the message

    // console.log("Archiving message with ID:", messageId);
    // console.log("Archiving for user:", userId, "Type:", userType);

    const updatedMessage = await messageService.deleteMessage(
      messageId,
      userId,
      userType,
      db
    );
    res
      .status(200)
      .json({ message: "Message deleted successfully", updatedMessage });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete message", details: error.message });
  }
};

// DELETE MESSAGE (Only for current user)
const deleteMessageForUser = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { userId, userType } = req.body;
    const messageId = req.params.id;

    const message = await messageService.findMessageById(messageId, db);
    if (!message) return res.status(404).json({ message: "Message not found" });

    await messageService.markMessageAsDeleted(messageId, userId, userType, db);

    res.json({ message: "Message deleted for this user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// const getDeletedSentMessages = async (req, res) => {
//   try {
//     const { userId, userType } = req.params;
//     const messages = await messageService.getUserDeletedSentMessages(userId, userType);
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch deleted sent messages", details: error.message });
//   }
// };
// const getDeletedInboxMessages = async (req, res) => {
//   try {
//     const { userId, userType } = req.params;
//     const messages = await messageService.getUserDeletedInboxMessages(userId, userType);
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch deleted sent messages", details: error.message });
//   }
// };

// GET DELETED MESSAGES FOR USER
const getDeletedMessagesForUser = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { userId, userType } = req.body; // Ensure body contains userId & userType

    const deletedMessages = await messageService.findDeletedMessagesForUser(
      userId,
      userType,
      db
    );

    res.json({ deletedMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const transferMessage = async (req, res) => {
  try {
    const db = await getDb(useNewDb(req));
    const { messageId } = req.params;
    const { newReceiver, forwardedBy } = req.body;

    if (
      !newReceiver?.userId ||
      !newReceiver?.userType ||
      !forwardedBy?.userId ||
      !forwardedBy?.userType
    ) {
      return res
        .status(400)
        .json({ error: "Receiver or Forwarder information is incomplete" });
    }

    const updatedMessage = await messageService.transferMessage(
      messageId,
      newReceiver,
      forwardedBy,
      db
    );

    res.status(200).json({ message: "Message transferred", updatedMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  sendMessage,
  getInbox,
  getArchivedInbox,
  getSentMessages,
  getArchivedSentMessages,
  markMessageAsRead,
  markMessageAsUnread,
  archiveMessage,
  deleteMessage,
  fetchReplies,
  deleteMessageForUser,
  restoreMessage,
  getDeletedMessagesForUser,
  transferMessage,
};
