const fs = require("fs").promises;

const generateUniqueFilename = (extension, reference) => {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    const randomString = Math.random().toString(36).substring(2, 9);
    return `${timestamp}_${randomString}_${reference}.${extension}`;
}

const deleteFileFromServer = (filePath) => {
    try {
        fs.unlinkSync(filePath);
      
        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
      }
}

async function ensureDirectoryExistence(dirPath) {
  try {
    await fs.access(dirPath);
  } catch (error) {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

module.exports = {
      generateUniqueFilename,
      ensureDirectoryExistence
};