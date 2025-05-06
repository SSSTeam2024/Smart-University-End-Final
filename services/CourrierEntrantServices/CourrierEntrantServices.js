const fs = require("fs");
const CourrierEntrantDao = require("../../dao/CourrierEntrantDao/CourrierEntrantDao");
const globalFunctions = require("../../utils/globalFunctions");
const { getDb } = require("../../config/dbSwitcher");

const createCourrierEntrant = async (courrierEntrant, documents, useNew) => {
  const db = await getDb(useNew);
  let saveResult = await saveDocumentsToServer(documents);
  return await CourrierEntrantDao.createCourrierEntrant(courrierEntrant, db);
};

const updateCourrierEntrant = async (id, updateData, documents, useNew) => {
  const db = await getDb(useNew);
  let saveResult = await saveDocumentsToServer(documents);
  return await CourrierEntrantDao.updateCourrierEntrant(id, updateData, db);
};

const getAllCourrierEntrant = async (useNew) => {
  const db = await getDb(useNew);
  const result = await CourrierEntrantDao.getCourrierEntrants(db);
  return result;
};

const getLastCourrierEntrant = async (useNew) => {
  const db = await getDb(useNew);
  const result = await CourrierEntrantDao.getLastCourrierEntrant(db);
  return result;
};

const deleteCourrierEntrant = async (id, useNew) => {
  const db = await getDb(useNew);
  return await CourrierEntrantDao.deleteCourrierEntrant(id, db);
};

async function saveFile(base64String, fileName, file_path) {
  if (base64String != undefined) {
    const binaryData = Buffer.from(base64String, "base64");
    const filePath = file_path + fileName;
    await globalFunctions.ensureDirectoryExistence(file_path);
    fs.writeFile(filePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
      } else {
        console.log("File saved successfully!");
      }
    });
  }
}

async function saveDocumentsToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    await saveFile(file.base64String, file.name, file.path);
    counter++;
    console.log("File number " + counter + " saved");
  }
  if (counter == documents.length) return true;
}

module.exports = {
  createCourrierEntrant,
  updateCourrierEntrant,
  getAllCourrierEntrant,
  deleteCourrierEntrant,
  getLastCourrierEntrant,
};
