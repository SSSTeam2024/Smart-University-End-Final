const StudentsMessageService = require("../../services/StudentsMessageServices/StudentsMessageServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createStudentsMessage = async (req, res) => {
  try {
    const { receiverId, senderId, roomId, msg_type, text, files } = req.body;
    let documents = [];
    let fileNames = [];

    const filePath = "files/StudentsMessages/";

    for (let file of files) {
      const Filename = globalFunctions.generateUniqueFilename(
        file.FileExtension,
        "StudentsMessage"
      );
      documents.push({
        base64String: file.FileBase64String,
        name: Filename,
        extension: file.FileExtension,
        path: filePath,
      });
      fileNames.push(Filename);
    }

    const studentsMessage = await StudentsMessageService.createStudentsMessage(
      {
        receiverId,
        senderId,
        roomId,
        msg_type,
        text,
        files: fileNames,
      },
      documents,
      useNewDb(req)
    );
    res.json(studentsMessage);
  } catch (error) {
    console.error(error);
  }
};

const loadLatestMessages = async (req, res) => {
  try {
    const { roomId, senderId } = req.params;
    const { limit, before } = req.query;
    const messagesData = await StudentsMessageService.loadLatestMessages(
      roomId,
      senderId,
      parseInt(limit) || 20,
      before ? new Date(before) : new Date(),
      useNewDb(req)
    );

    res.json(messagesData);
  } catch (error) {
    console.error("Error loading latest messages:", error);
    res
      .status(500)
      .json({ error: "Erreur lors du chargement des messages recents." });
  }
};

const loadMessagesWithPagination = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const paginatedMessages =
      await StudentsMessageService.loadMessagesWithPagination(
        roomId,
        page,
        limit,
        useNewDb(req)
      );

    res.json(paginatedMessages);
  } catch (error) {
    console.error("Error loading paginated messages:", error);
    res
      .status(500)
      .json({ error: "Erreur lors du chargement des messages paginations." });
  }
};

const getNotSeenMessages = async (req, res) => {
  try {
    const { userId, chattingWith } = req.body;

    const messages = await StudentsMessageService.getNotSeenMessages(
      userId,
      chattingWith,
      useNewDb(req)
    );

    res.json(messages);
  } catch (error) {
    console.error("Error loading messages:", error);
    res.status(500).json({ error: "Erreur lors du chargement des messages." });
  }
};

const updateNotSeenMessages = async (req, res) => {
  try {
    const { userId, chattingWith } = req.body;

    const messages = await StudentsMessageService.updateNotSeenMessagesToSeen(
      userId,
      chattingWith,
      useNewDb(req)
    );

    res.json(messages);
  } catch (error) {
    console.error("Error loading messages:", error);
    res.status(500).json({ error: "Erreur lors du chargement des messages." });
  }
};

module.exports = {
  createStudentsMessage,
  loadLatestMessages,
  loadMessagesWithPagination,
  getNotSeenMessages,
  updateNotSeenMessages,
};
