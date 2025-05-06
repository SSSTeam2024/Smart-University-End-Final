const demandeTirageDao = require("../../dao/DemandeTirageDao/DemandeTirageDao");
const { getDb } = require("../../config/dbSwitcher");
const fs = require("fs");

const createDemandeTirage = async (demandeTirageData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    let saveResult = await saveDocumentToServer(documents);
    if (saveResult) {
      return await demandeTirageDao.createDemandeTirage(demandeTirageData, db);
    } else {
      throw new Error("Failed to save documents.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function saveDocumentToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      await saveAdministrativeFile(file.base64String, file.name, file.path);
      counter++;
    }
    return counter === documents.length;
  } catch (error) {
    console.error("Error saving documents:", error);
    return false;
  }
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, "base64");
    const fullFilePath = filePath + fileName;
    fs.writeFile(fullFilePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
        reject(err);
      } else {
        console.log("File saved successfully!");
        resolve();
      }
    });
  });
}

const getAllDemandesTirage = async (useNew) => {
  const db = await getDb(useNew);
  return await demandeTirageDao.getAllDemandesTirage(db);
};

const deleteDemandeTirage = async (id, useNew) => {
  const db = await getDb(useNew);
  return await demandeTirageDao.deleteDemandeTirage(id, db);
};
const updateEtatDemandeTirageService = async (
  demandeTirageId,
  etat,
  date,
  heure,
  useNew
) => {
  if (!etat) {
    throw new Error(" etat must be provided.");
  }
  const db = await getDb(useNew);
  return await demandeTirageDao.updateEtatDemandeTirage(
    demandeTirageId,
    etat,
    date,
    heure,
    db
  );
};

const getDemandesTirageByTeacherId = async (enseignantId, useNew) => {
  const db = await getDb(useNew);
  return await demandeTirageDao.getDemandesTirageByTeacherId(enseignantId, db);
};

const deleteManyDemandesTirages = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await demandeTirageDao.deleteManyDemandesTirages(db, ids);
};

module.exports = {
  createDemandeTirage,
  getAllDemandesTirage,
  deleteDemandeTirage,
  updateEtatDemandeTirageService,
  getDemandesTirageByTeacherId,
  deleteManyDemandesTirages,
};
