const Message = require("../../model/MessageModel-old/MessageModel.js");
const getUser = require("../../utils/getUser.js");

/**
 * @desc Send a message between users
 * @route POST /api/messages/send
 */
const sendMessage = async (req, res) => {
  try {
    const { senderId, senderType, receiverId, receiverType, text, image } =
      req.body;

    const newMessage = new Message({
      sender: { id: senderId, type: senderType },
      receiver: { id: receiverId, type: receiverType },
      text,
      image,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get all messages between two users
 * @route GET /api/messages/conversation/:userId1/:userType1/:userId2/:userType2
 */
const getConversation = async (req, res) => {
  try {
    const { userId1, userType1, userId2, userType2 } = req.params;

    const messages = await Message.find({
      $or: [
        {
          "sender.id": userId1,
          "sender.type": userType1,
          "receiver.id": userId2,
          "receiver.type": userType2,
        },
        {
          "sender.id": userId2,
          "sender.type": userType2,
          "receiver.id": userId1,
          "receiver.type": userType1,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get a single message with sender & receiver details
 * @route GET /api/messages/:messageId
 */
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    const sender = await getUser.getUserById(
      message.sender.id,
      message.sender.type
    );
    const receiver = await getUser.getUserById(
      message.receiver.id,
      message.receiver.type
    );

    res.json({ ...message.toObject(), sender, receiver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getMessageById,
  sendMessage,
  getConversation,
};
