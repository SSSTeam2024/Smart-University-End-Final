const coursEnseignantDao = require("../../dao/CoursEnseignantDao/CoursEnseignantDao");
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

const addCoursEnseignant = async (coursEnseignantData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await coursEnseignantDao.addCoursEnseignant(coursEnseignantData, db);
  } catch (error) {
    console.error("Error creating Actualite:", error);
    throw error;
  }
};

const getCoursEnseignants = async (useNew) => {
  const db = await getDb(useNew);
  return coursEnseignantDao.getCoursEnseignants(db);
};

const getCoursEnseignantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return coursEnseignantDao.getCoursEnseignantById(id, db);
};

const getCoursEnseignantByIdClasse = async (id, useNew) => {
  const db = await getDb(useNew);
  return coursEnseignantDao.getCoursEnseignantByIdClasse(id, db);
};

const updateCoursEnseignant = async (id, updateData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    if (documents && documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    return await coursEnseignantDao.updateCoursEnseignant(id, updateData, db);
  } catch (error) {
    console.error("Error updating Actualite:", error);
    throw error;
  }
};

const deleteCoursEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);
  return coursEnseignantDao.deleteCoursEnseignant(id, db);
};

const getSupportCoursByTeacherId = async (enseignantId, useNew) => {
  const db = await getDb(useNew);
  return await coursEnseignantDao.getSupportCoursByTeacherId(enseignantId, db);
};
const deleteSupportCoursEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);
  return await coursEnseignantDao.deleteSupportCoursEnseignant(id, db);
};

module.exports = {
  addCoursEnseignant,
  getCoursEnseignants,
  getCoursEnseignantById,
  updateCoursEnseignant,
  deleteCoursEnseignant,
  getCoursEnseignantByIdClasse,
  getSupportCoursByTeacherId,
  deleteSupportCoursEnseignant,
};
