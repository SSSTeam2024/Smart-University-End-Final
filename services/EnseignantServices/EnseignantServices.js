const enseignantDao = require("../../dao/EnseignantDao/EnseignantDao") 
const fs = require("fs");
const path = require('path');
const EnseignantModel = require("../../model/EnseignantModel/EnseignantModel");
const registerEnseignantDao = async (userData, documents) => {
  try {
    const saveResult = await saveDocumentToServer(documents);
    if (saveResult) {
      const newEnseignant = await enseignantDao.createEnseignant(userData);
      return newEnseignant;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error('Error registering enseignant:', error);
    throw error;
  }
};

// Function to save documents
async function saveDocumentToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    await saveAdministrativeFile(file.base64String, file.name, file.path);
    counter++;
    console.log('File number ' + counter + ' saved');
  }
  return counter === documents.length;
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  const binaryData = Buffer.from(base64String, 'base64');
  const fullFilePath = path.join(filePath, fileName);

  // Ensure the directory exists
  await fs.promises.mkdir(filePath, { recursive: true });

  await fs.promises.writeFile(fullFilePath, binaryData, 'binary');
  console.log('File saved successfully at:', fullFilePath);
}


const getEnseignatsDao = async () => {
  const result = await enseignantDao.getEnseignants();
  return result;
};

const deleteEnseignantDao = async (id) => {
  return await enseignantDao.deleteEnseignant(id);
};
const updateEnseignantDao = async (id, updateData) => {
  return await enseignantDao.updateEnseignant(id, updateData);
};

const getEnseignantById = async (id) => {
  return await enseignantDao.getEnseignantById(id);
};

const assignPapierToTeacher = async (enseignantId, papierIds) => {
  try {
    const enseignant = await EnseignantModel.findById(enseignantId);
    if (!enseignant) {
      throw new Error('Enseignant not found');
    }
    for (const paperId of papierIds) {
      enseignant.papers.push(paperId);
    }

    await enseignant.save();
    return enseignant;
  } catch (error) {
    console.error('Error in assignPapierToTeacher:', error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};
module.exports = {
  registerEnseignantDao,
  getEnseignatsDao,
  deleteEnseignantDao,
  updateEnseignantDao,
  getEnseignantById,
  assignPapierToTeacher
};