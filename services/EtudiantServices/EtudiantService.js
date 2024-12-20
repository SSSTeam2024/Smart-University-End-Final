const etudiantDao = require("../../dao/studentDao/studentDao");
const fs = require("fs");
const path = require("path");
const globalFunctions = require("../../utils/globalFunctions");

const registerEtudiant = async (userData, documents) => {
  try {
    console.log("documents", documents);
    const saveResult = await saveDocumentToServer(documents);
    if (saveResult) {
      const newEtudiant = await etudiantDao.createEudiant(userData);
      return newEtudiant;
    } else {
      throw new Error("Failed to save documents.");
    }
  } catch (error) {
    console.error("Error registering etudiant:", error);
    throw error;
  }
};

// Function to save documents
async function saveDocumentToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    console.log("file", file);
    await saveFile(file.base64String, file.name, file.path);

    counter++;
  }
  if (counter == documents.length) return true;
}

async function saveFile(base64String, fileName, file_path) {
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

const getEtudiants = async () => {
  const result = await etudiantDao.getEtudiants();
  return result;
};
const getEtudiantById = async (id) => {
  return etudiantDao.getEtudiantById(id);
};

const deleteEtudiant = async (id) => {
  return await etudiantDao.deleteEtudiant(id);
};


const updateEtudiant = async (id, updateData) => {
  return await etudiantDao.updateEtudiant(id, updateData);
};

const getTypeInscriptionByIdStudent = async (studentId) => {
  try {
    const typeInscription = await etudiantDao.getTypeInscriptionByIdStudent(studentId);
    return typeInscription;
  } catch (error) {
    console.error("Error in service while fetching TypeInscription by Student ID:", error);
    throw error;
  }
};

module.exports = {
  getEtudiants,
  getEtudiantById,
  registerEtudiant,
  deleteEtudiant,
  updateEtudiant,
  getTypeInscriptionByIdStudent
};