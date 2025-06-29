const deplacementDao = require("../../dao/DeplacementDao/DeplacementDao");
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

const createDeplacement = async (deplacementData, documents, dbName) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    const db = await getDb(dbName);
    return await deplacementDao.createDeplacement(deplacementData, db);
  } catch (error) {
    console.error("Error creating Deplacement:", error);
    throw error;
  }
};

// const getAllDeplacements = async () => {
//   return deplacementDao.getAllDeplacements();
// };

const getAllDeplacements = async (dbName) => {
  const db = await getDb(dbName);
  return deplacementDao.getAllDeplacements(db);
};

const getDeplacementById = async (id) => {
  return deplacementDao.getDeplacementById(id);
};

const updateDeplacement = async (id, updateData, documents) => {
  try {
    // Save the new media files to the server
    if (documents && documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    // Update the Actualite in the database with new data
    return await deplacementDao.updateDeplacement(id, updateData);
  } catch (error) {
    console.error("Error updating Deplacement ", error);
    throw error;
  }
};

const deleteDeplacement = async (id) => {
  return deplacementDao.deleteDeplacement(id);
};

const deleteManyDeplacements = async (dbName, ids) => {
  const db = await getDb(dbName);
  return await deplacementDao.deleteManyDeplacements(db, ids);
};

const getDeplacementsByPersonnelId = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return deplacementDao.getDeplacementByPersonnelId(id, db);
  } catch (error) {
    console.error(
      "Error while fetching deplacement by personnel id in services",
      error
    );
  }
};

module.exports = {
  createDeplacement,
  getAllDeplacements,
  getDeplacementById,
  updateDeplacement,
  deleteDeplacement,
  deleteManyDeplacements,
  getDeplacementsByPersonnelId,
};
