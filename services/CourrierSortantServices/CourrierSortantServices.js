const fs = require("fs");
const CourrierSortantDao = require("../../dao/CourrierSortantDao/CourrierSortantDao");
const globalFunctions = require("../../utils/globalFunctions");

const createCourrierSortant = async (courrierSortant, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await CourrierSortantDao.createCourrierSortant(courrierSortant);
};

const updateCourrierSortant = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await CourrierSortantDao.updateCourrierSortant(id, updateData);
};

const getAllCourrierSortant = async () => {
  const result = await CourrierSortantDao.getCourrierSortants();
  return result;
};

const deleteCourrierSortant = async (id) => {
  return await CourrierSortantDao.deleteCourrierSortant(id);
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
  createCourrierSortant,
  updateCourrierSortant,
  getAllCourrierSortant,
  deleteCourrierSortant,
};
