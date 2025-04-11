const messageService = require("../../dao/MessaegrieDao/MessagerieDao");
const messageServices = require ('../../services/MessagerieServices/MessagerieServices')
const globalFunctions = require("../../utils/globalFunctions");

const {getUserById}= require ("../../utils/getUser")

// const sendMessage = async (req, res) => {
//   try {
//     const { sender, receiver, subject, content, attachments } = req.body;
//     const message = await messageService.createMessage({ sender, receiver, subject, content, attachments });
//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message", details: error.message });
//   }
// };

const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, subject, content, attachmentsBase64Strings,attachmentsExtensions, parentMessageId   } = req.body;
    
    const attachementsPath = 'files/messagerieFiles/';
    const attachementsFilenames  = attachmentsExtensions.map((ext, index) => 
          globalFunctions.generateUniqueFilename(ext, `MessagerieFiles_${index}`)
        );

        let documents = [...attachmentsBase64Strings.map((base64String, index) => ({
          base64String: base64String,
          extension: attachmentsExtensions[index],
          name: attachementsFilenames[index],
          path: attachementsPath
        }))]
    const message = await messageServices.createMessage({ sender, receiver, subject, content, attachments: attachementsFilenames,   parentMessageId: parentMessageId || null },documents);

    // Fetch sender and receiver details
    const senderDetails = await getUserById(sender.userId, sender.userType);
    const receiverDetails = await getUserById(receiver.userId, receiver.userType);

    res.status(201).json({
      ...message.toObject(),
      sender: { ...sender, ...senderDetails?._doc },
      receiver: { ...receiver, ...receiverDetails?._doc },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
};

 const fetchReplies = async (req, res) => {
  const { messageId } = req.params;

  try {
    const replies = await messageService.getRepliesByMessageId(messageId);
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
    const { userId, userType } = req.params;
    const messages = await messageService.getUserInbox(userId, userType);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inbox", details: error.message });
  }
};
const getArchivedInbox = async (req, res) => {
  try {
    const { userId, userType } = req.params;
    const messages = await messageService.getUserArchivedInbox(userId, userType);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch archived inbox", details: error.message });
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
    const { userId, userType } = req.params;
    const messages = await messageService.getUserSentMessages(userId, userType);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sent messages", details: error.message });
  }
};
const getArchivedSentMessages = async (req, res) => {
  try {
    const { userId, userType } = req.params;
    const messages = await messageService.getUserArchivedSentMessages(userId, userType);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sent messages", details: error.message });
  }
};

const markMessageAsRead = async (req, res) => {
  try {
    const message = await messageService.markAsRead(req.params.messageId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark message as read", details: error.message });
  }
};
const archiveMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, userType } = req.body; // Get the user who is archiving the message

    // console.log("Archiving message with ID:", messageId);
    // console.log("Archiving for user:", userId, "Type:", userType);

    const updatedMessage = await messageService.archiveMessage(messageId, userId, userType);
    res.status(200).json({ message: "Message archived successfully", updatedMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to archive message", details: error.message });
  }
};


const deleteMessage = async (req, res) => {
  try {
    await messageService.deleteMessage(req.params.messageId);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message", details: error.message });
  }
};


// DELETE MESSAGE (Only for current user)
 const deleteMessageForUser = async (req, res) => {
  try {
    const { userId, userType } = req.body;
    const messageId = req.params.id;

    const message = await messageService.findMessageById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    await messageService.markMessageAsDeleted(messageId, userId, userType);

    res.json({ message: "Message deleted for this user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendMessage,
  getInbox,
  getArchivedInbox,
  getSentMessages,
  getArchivedSentMessages,
  markMessageAsRead,
  archiveMessage,
  deleteMessage,
  fetchReplies,
  deleteMessageForUser
};