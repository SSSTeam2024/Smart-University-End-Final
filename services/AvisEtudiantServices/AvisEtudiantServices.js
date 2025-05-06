const avisEtudiantDao = require("../../dao/AvisEtudiantDao/AvisEtudiantDao");
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

const createAvisEtudiant = async (avisEtudiantData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await avisEtudiantDao.createAvisEtudiant(avisEtudiantData, db);
  } catch (error) {
    console.error("Error creating AvisEtudiant:", error);
    throw error;
  }
};

const getAllAvisEtudiants = async (useNew) => {
  const db = await getDb(useNew);
  return await avisEtudiantDao.getAllAvisEtudiants(db);
};

const getAvisEtudiantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return avisEtudiantDao.getAvisEtudiantById(id, db);
};

const updateAvisEtudiant = async (id, updateData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    // Save the new media files to the server

    if (documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    // Update the Actualite in the database with new data
    return await avisEtudiantDao.updateAvisEtudiant(id, updateData, db);
  } catch (error) {
    console.error("Error updating Avis Etudiant :", error);
    throw error;
  }
};

const deleteAvisEtudiant = async (id, useNew) => {
  const db = await getDb(useNew);
  return avisEtudiantDao.deleteAvisEtudiant(id, db);
};

const deleteAvisEtudiants = async (dbName, ids) => {
  const db = await getDb(dbName);
  return await avisEtudiantDao.deleteAvisEtudiants(db, ids);
};

module.exports = {
  createAvisEtudiant,
  getAllAvisEtudiants,
  getAvisEtudiantById,
  updateAvisEtudiant,
  deleteAvisEtudiant,
  deleteAvisEtudiants,
};
