const StudentsMessageDao = require("../../dao/StudentsMessageDao/StudentsMessageDao");
const { getDb } = require("../../config/dbSwitcher");
const fs = require("fs");

async function saveMediaToServer(documents) {
    try {
        let counter = 0;
        for (const file of documents) {
            await saveFile(file.base64String, file.name, file.path);
            counter++;
            console.log(`File number ${counter} saved`);
        }
        if (counter === documents.length) return true;
    } catch (error) {
        console.error("Error saving media files:", error);
        throw error;
    }
}

async function saveFile(base64String, fileName, filePath) {
    const binaryData = Buffer.from(base64String, "base64");
    console.log("binaryData", binaryData)
    const fullFilePath = filePath + fileName;
    try {
        fs.writeFile(fullFilePath, binaryData, "binary", (err) => {
            if (err) {
                console.error("Error saving the file:", err);

            } else {
                console.log("File saved successfully!");
            }
        });
    } catch (err) {
        console.error("Error saving the file:", err);
        throw err;
    }
}


const createStudentsMessage = async (studentsMessageData, documents, useNew) => {
    try {
        console.log("documents", documents)
        const db = await getDb(useNew);
        const saveResult = await saveMediaToServer(documents);
        if (!saveResult) {
            throw new Error("Not all files were saved successfully.");
        }
        return await StudentsMessageDao.createStudentsMessage(studentsMessageData, db);
    } catch (error) {
        console.error("Error creating Model:", error);
        throw error;
    }
};

const loadMessagesByRoom = async (roomId, limit, beforeDate, useNew) => {
    try {
        const db = await getDb(useNew);
        return await StudentsMessageDao.loadMessagesByRoom(roomId, limit, beforeDate, db);
    }
    catch (error) {
        console.error("Error in loadMessagesByRoom :", error);
        throw error;
    }

};

module.exports = {
    createStudentsMessage,
    loadMessagesByRoom
};
