const avisPersonnelDao = require('../../dao/AvisPersonnelDao/AvisPersonnelDao');
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
  const binaryData = Buffer.from(base64String, "base64");
  const fullFilePath = filePath + fileName;
  try {
    await fs.writeFile(fullFilePath, binaryData, "binary");
    console.log("File saved successfully!");
  } catch (err) {
    console.error("Error saving the file:", err);
    throw err;
  }
}

const createAvisPersonnel = async (avisPersonnelData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await avisPersonnelDao.createAvisPersonnel(avisPersonnelData);
  } catch (error) {
    console.error("Error creating AvisPersonnel:", error);
    throw error;
  }
};

const getAllAvisPersonnels = async () => {
  return avisPersonnelDao.getAllAvisPersonnels();
};

const getAvisPersonnelById = async (id) => {
  return avisPersonnelDao.getAvisPersonnelById(id);
};

const updateAvisPersonnel = async (id, updateData) => {
  return avisPersonnelDao.updateAvisPersonnel(id, updateData);
};

const deleteAvisPersonnel = async (id) => {
  return avisPersonnelDao.deleteAvisPersonnel(id);
};

module.exports = {
  createAvisPersonnel,
  getAllAvisPersonnels,
  getAvisPersonnelById,
  updateAvisPersonnel,
  deleteAvisPersonnel
};