const ActualiteDao = require("../../dao/ActualiteDao/ActualiteDao");
const { getDb } = require("../../config/dbSwitcher");

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

const getAllActualites = async (useNew) => {
  const db = await getDb(useNew);
  return await ActualiteDao.getAllActualites(db);
};

const createActualite = async (ActualiteData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await ActualiteDao.createActualite(ActualiteData, db);
  } catch (error) {
    console.error("Error creating Actualite:", error);
    throw error;
  }
};

const getActualiteById = async (id, useNew) => {
  const db = await getDb(useNew);
  return ActualiteDao.getActualiteById(id);
};

const updateActualite = async (id, updateData, documents, useNew) => {
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
    return await ActualiteDao.updateActualite(id, updateData, db);
  } catch (error) {
    console.error("Error updating Actualite:", error);
    throw error;
  }
};

const deleteActualite = async (id, useNew) => {
  const db = await getDb(useNew);
  return ActualiteDao.deleteActualite(id, db);
};

const deleteManyActualites = async (dbName, ids) => {
  const db = await getDb(dbName);
  return await ActualiteDao.deleteManyActualites(db, ids);
};

module.exports = {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite,
  deleteManyActualites,
};
