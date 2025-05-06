const avisPersonnelDao = require("../../dao/AvisPersonnelDao/AvisPersonnelDao");
const fs = require("fs").promises;

const { getDb } = require("../../config/dbSwitcher");

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

const createAvisPersonnel = async (avisPersonnelData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await avisPersonnelDao.createAvisPersonnel(avisPersonnelData, db);
  } catch (error) {
    console.error("Error creating AvisPersonnel:", error);
    throw error;
  }
};

const getAllAvisPersonnels = async (dbName) => {
  const db = await getDb(dbName);
  return avisPersonnelDao.getAllAvisPersonnels(db);
};

const getAvisPersonnelById = async (id, useNew) => {
  const db = await getDb(useNew);
  return avisPersonnelDao.getAvisPersonnelById(id, db);
};

const updateAvisPersonnel = async (id, updateData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    // Save the new media files to the server
    if (documents && documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    // Update the Actualite in the database with new data
    return await avisPersonnelDao.updateAvisPersonnel(id, updateData, db);
  } catch (error) {
    console.error("Error updating Avis Personnel :", error);
    throw error;
  }
};

const deleteAvisPersonnel = async (id, useNew) => {
  const db = await getDb(useNew);
  return avisPersonnelDao.deleteAvisPersonnel(id, db);
};

const deleteManyAvisPersonnel = async (dbName, id) => {
  const db = await getDb(dbName);
  return avisPersonnelDao.deleteManyAvisPersonnels(db, id);
};

module.exports = {
  createAvisPersonnel,
  getAllAvisPersonnels,
  getAvisPersonnelById,
  updateAvisPersonnel,
  deleteAvisPersonnel,
  deleteManyAvisPersonnel,
};
