const fs = require("fs");
const StagePfeDao = require("../../dao/StagePfeDao/StagePfeDao");
const globalFunctions = require("../../utils/globalFunctions");
const { getDb } = require("../../config/dbSwitcher");

const createStagePfe = async (stagePfe, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    let saveResult = await saveDocumentsToServer(documents);
    return await StagePfeDao.createStagePfe(stagePfe, db);
  } catch (error) {
    console.error("Error creating stage pfe in services:", error);
  }
};

const updateStagePfe = async (id, updateData, documents, useNew) => {
  const db = await getDb(useNew);
  let saveResult = await saveDocumentsToServer(documents);
  return await StagePfeDao.updateStagePfe(id, updateData, db);
};

const getStagesPfe = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await StagePfeDao.getStagesPfe(db);
    return result;
  } catch (error) {
    console.error("Error fetching all stages pfe in services:", error);
  }
};

const deleteStagePfe = async (id, useNew) => {
  const db = await getDb(useNew);
  return await StagePfeDao.deleteStagePfe(id, db);
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
  createStagePfe,
  updateStagePfe,
  getStagesPfe,
  deleteStagePfe,
};
