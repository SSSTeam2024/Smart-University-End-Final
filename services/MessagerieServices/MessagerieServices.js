const MessagerieDao = require('../../dao/MessaegrieDao/MessagerieDao')
const fs = require("fs").promises;

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
 
  const cleanedBase64 = base64String.split(',')[1];

  const binaryData = Buffer.from(cleanedBase64, "base64");
  const fullFilePath = filePath + fileName;
  try {
    await fs.writeFile(fullFilePath, binaryData);
    console.log("File saved successfully!");
  } catch (err) {
    console.error("Error saving the file:", err);
    throw err;
  }
}

const createMessage = async (data, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await MessagerieDao.createMessage(data);
  } catch (error) {
    console.error("Error creating Actualite:", error);
    throw error;
  }
};

module.exports = {
    createMessage
 
};