const demandeTirageDao = require("../../dao/DemandeTirageDao/DemandeTirageDao");
const fs = require('fs');

const createDemandeTirage = async (demandeTirageData, documents) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    console.log("Save result:", saveResult);
    if (saveResult) {
      return await demandeTirageDao.createDemandeTirage(demandeTirageData);
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// function saveDocumentToServer
async function saveDocumentToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      console.log(file);
      await saveAdministrativeFile(file.base64String, file.name, file.path);
      counter++;
      console.log('File number ' + counter + ' saved');
    }
    return counter === documents.length;
  } catch (error) {
    console.error('Error saving documents:', error);
    return false;
  }
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, 'base64');
    const fullFilePath = filePath + fileName;
    fs.writeFile(fullFilePath, binaryData, 'binary', (err) => {
      if (err) {
        console.error('Error saving the file:', err);
        reject(err);
      } else {
        console.log('File saved successfully!');
        resolve();
      }
    });
  });
}

const getAllDemandesTirage = async () => {
  return await demandeTirageDao.getAllDemandesTirage();
};

// const updateAbsenceEtudiant = async (id, updateData) => {
//   return await absenceEtudiantDao.updateAbsenceEtudiant(id, updateData);
// };

// const getAbsenceEtudiantById = async (id) => {
//   return await absenceEtudiantDao.getAbsenceEtudiantById(id);
// };

const deleteDemandeTirage = async (id) => {
  return await demandeTirageDao.deleteDemandeTirage(id);
};
const updateEtatDemandeTirageService = async (
  demandeTirageId,
  etat,
  date, heure
) => {
  if (!etat) {
    throw new Error(" etat must be provided.");
  }

  return await demandeTirageDao.updateEtatDemandeTirage(
    demandeTirageId,
    etat,
    date, heure
  );
};

// const getAllAbsenceClasse = async (id) => {
//   return await absenceEtudiantDao.getAllAbsenceClasse(id);
// };
const getDemandesTirageByTeacherId = async (enseignantId) => {
  return await demandeTirageDao.getDemandesTirageByTeacherId(enseignantId);
};
module.exports = {
  createDemandeTirage,
  getAllDemandesTirage,
  deleteDemandeTirage,
  updateEtatDemandeTirageService,
  getDemandesTirageByTeacherId
};
