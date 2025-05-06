const avisEnseignantDao = require("../../dao/AvisEnseignantDao/AvisEnseignantDao");
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

const createAvisEnseignant = async (avisEnseignantData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await avisEnseignantDao.createAvisEnseignant(avisEnseignantData, db);
  } catch (error) {
    console.error("Error creating AvisEnseignant:", error);
    throw error;
  }
};

const getAllAvisEnseignants = async (useNew) => {
  const db = await getDb(useNew);
  return avisEnseignantDao.getAllAvisEnseignants(db);
};

const getAvisEnseignantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return avisEnseignantDao.getAvisEnseignantById(id, db);
};

const updateAvisEnseignant = async (id, updateData, documents, useNew) => {
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
    return await avisEnseignantDao.updateAvisEnseignant(id, updateData, db);
  } catch (error) {
    console.error("Error updating Avis Enseignant ", error);
    throw error;
  }
};

const deleteAvisEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);
  return avisEnseignantDao.deleteAvisEnseignant(id, db);
};

const deleteAvisEnseignants = async (dbName, ids) => {
  const db = await getDb(dbName);
  return await avisEnseignantDao.deleteAvisEnseignants(db, ids);
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant,
  deleteAvisEnseignants,
};
