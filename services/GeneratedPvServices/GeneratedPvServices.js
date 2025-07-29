const fs = require("fs");
const GeneratedPvDao = require("../../dao/GeneratedPvDao/GeneratedPvDao");
const globalFunctions = require("../../utils/globalFunctions");
const { getDb } = require("../../config/dbSwitcher");

const createGeneratedPv = async (generatedPvData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await GeneratedPvDao.createGeneratedPv(generatedPvData, db);
  } catch (error) {
    console.error("create new Generated Pv in services: ", error);
  }
};

const updateGeneratedPv = async (id, updateData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    let saveResult = await saveDocumentsToServer(documents);
    return await GeneratedPvDao.updateGeneratedPv(id, updateData, db);
  } catch (error) {
    console.error("update Generated Pv in services: ", error);
  }
};

const getGeneratedPvs = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await GeneratedPvDao.getGeneratedPvs(db);
    return result;
  } catch (error) {
    console.error("Get all Generated Pvs in services: ", error);
  }
};

const deleteGeneratedPv = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await GeneratedPvDao.deleteGeneratedPv(id, db);
  } catch (error) {
    console.error("Delete Generated Pv in services: ", error);
  }
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
  createGeneratedPv,
  deleteGeneratedPv,
  getGeneratedPvs,
  updateGeneratedPv,
};
