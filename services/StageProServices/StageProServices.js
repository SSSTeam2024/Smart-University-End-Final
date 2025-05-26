const fs = require("fs");
const StageProDao = require("../../dao/StageProDao/StageProDao");
const globalFunctions = require("../../utils/globalFunctions");
const { getDb } = require("../../config/dbSwitcher");

const createStagePro = async (stagePro, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    let saveResult = await saveDocumentsToServer(documents);
    return await StageProDao.createStagePro(stagePro, db);
  } catch (error) {
    console.error("Error creating stage Pro in services:", error);
  }
};

const updateStagePro = async (id, updateData, documents, useNew) => {
  const db = await getDb(useNew);
  let saveResult = await saveDocumentsToServer(documents);
  return await StageProDao.updateStagePro(id, updateData, db);
};

const getStagesPro = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await StageProDao.getStagesPro(db);
    return result;
  } catch (error) {
    console.error("Error fetching all stages Pro in services:", error);
  }
};

const deleteStagePro = async (id, useNew) => {
  const db = await getDb(useNew);
  return await StageProDao.deleteStagePro(id, db);
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
  createStagePro,
  updateStagePro,
  getStagesPro,
  deleteStagePro,
};
