const StudentsMessageService = require("../../services/StudentsMessageServices/StudentsMessageServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
    return req.headers["x-use-new-db"] === "true";
}

const createStudentsMessage = async (req, res) => {
    try {
        const { receiverId, senderId, roomId, text, status, seenAt, files } =
            req.body;
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
            })
            fileNames.push(Filename)


        }

        const studentsMessage = await StudentsMessageService.createStudentsMessage(
            {
                receiverId,
                senderId,
                roomId,
                text, status, seenAt, files: fileNames
            }, documents,
            useNewDb(req)
        );
        res.json(studentsMessage);
    } catch (error) {
        console.error(error);
    }
};

const loadMessagesByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { limit, before } = req.query;
        const messages = await StudentsMessageService.loadMessagesByRoom(
            roomId,
            parseInt(limit) || 20,
            before ? new Date(before) : new Date(),
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
    loadMessagesByRoom
};
