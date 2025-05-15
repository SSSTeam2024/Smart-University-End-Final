const reclamationDao = require("../../dao/ReclamationPersonnelDao/ReclamationPersonnelDao");
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

const createReclamation = async (reclamationData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await reclamationDao.createReclamation(reclamationData, db);
  } catch (error) {
    console.error("Error creating recalamation personnel:", error);
    throw error;
  }
};

const getAllReclamations = async (dbName) => {
  const db = await getDb(dbName);
  return reclamationDao.getAllReclamations(db);
};

const getReclamationById = async (id, useNew) => {
  const db = await getDb(useNew);
  return reclamationDao.getReclamationById(id, db);
};

const updateReclamation = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return reclamationDao.updateReclamation(id, updateData, db);
};

const deleteReclamation = async (id, useNew) => {
  const db = await getDb(useNew);
  return reclamationDao.deleteReclamation(id, db);
};

const deleteManyReclamation = async (dbName, ids) => {
  const db = await getDb(dbName);
  return reclamationDao.deleteManyReclamationPersonnel(db, ids);
};

const getReclamationsPersonnelId = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return reclamationDao.getReclamationsByPersonnelId(id, db);
  } catch (error) {
    console.error(
      "Error while fetching reclamations by personnel id in services",
      error
    );
  }
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
  deleteManyReclamation,
  getReclamationsPersonnelId,
};
