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

const updateJuryAssignment = async (id, juryFields, useNew) => {
  try {
    const db = await getDb(useNew);
    return await StagePfeDao.updateJuryAssignment(id, juryFields, db);
  } catch (error) {
    console.error("Error in assignJuryToStagePfe service:", error);
    throw error;
  }
};

// Service
const getDisponibiliteDetails = async (date, heureDebut, heureFin, avecSoutenance, useNew) => {
  try {
    const db = await getDb(useNew);
    const stages = await StagePfeDao.getDisponibiliteStage(date, heureDebut, heureFin, avecSoutenance, db);

    const unavailableSalle = new Set();
    const unavailableEtudiants = new Set();
    const unavailableEnseignants = new Set();

    stages.forEach(stage => {
      if (stage.salle) unavailableSalle.add(stage.salle);

      if (stage.etudiant) unavailableEtudiants.add(stage.etudiant.toString());
      if (stage.binome) unavailableEtudiants.add(stage.binome.toString());

      const juryMembers = [
        stage.rapporteur1,
        stage.rapporteur2,
        stage.examinateur1,
        stage.examinateur2,
        stage.invite1,
        stage.invite2,
        stage.chef_jury,
      ];

      juryMembers.forEach(member => {
        if (member) unavailableEnseignants.add(member.toString());
      });
    });

    return {
      salles: Array.from(unavailableSalle),
      etudiants: Array.from(unavailableEtudiants),
      enseignants: Array.from(unavailableEnseignants),
    };
  } catch (error) {
    console.error("Error in getDisponibiliteDetails service:", error);
    throw error;
  }

};


module.exports = {
  createStagePfe,
  updateStagePfe,
  getStagesPfe,
  deleteStagePfe,
  updateJuryAssignment,
  getDisponibiliteDetails
};
