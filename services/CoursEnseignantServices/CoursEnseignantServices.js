const coursEnseignantDao = require("../../dao/CoursEnseignantDao/CoursEnseignantDao");
const fs = require("fs").promises;

async function saveMediaToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      await saveFile(file.base64String, file.name, file.path);
      counter++;
      console.log(`File number ${counter} saved`);
    }
    if (counter === documents.length) return true;
  } catch (error) {
    console.error("Error saving media files:", error);
    throw error;
  }
}

async function saveFile(base64String, fileName, filePath) {
  const binaryData = Buffer.from(base64String, "base64");
  const fullFilePath = filePath + fileName;
  try {
    await fs.writeFile(fullFilePath, binaryData, "binary");
    console.log("File saved successfully!");
  } catch (err) {
    console.error("Error saving the file:", err);
    throw err;
  }
}

const addCoursEnseignant = async (coursEnseignantData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await coursEnseignantDao.addCoursEnseignant(coursEnseignantData);
  } catch (error) {
    console.error("Error creating Actualite:", error);
    throw error;
  }
};

const getCoursEnseignants = async () => {
  return coursEnseignantDao.getCoursEnseignants();
};

const getCoursEnseignantById = async (id) => {
  return coursEnseignantDao.getCoursEnseignantById(id);
};

const getCoursEnseignantByIdClasse = async (id) => {
  return coursEnseignantDao.getCoursEnseignantByIdClasse(id);
};

const updateCoursEnseignant = async (id, updateData, documents) => {
  try {
    if (documents && documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    return await coursEnseignantDao.updateCoursEnseignant(id, updateData);
  } catch (error) {
    console.error("Error updating Actualite:", error);
    throw error;
  }
};

const deleteCoursEnseignant = async (id) => {
  return coursEnseignantDao.deleteCoursEnseignant(id);
};

module.exports = {
  addCoursEnseignant,
  getCoursEnseignants,
  getCoursEnseignantById,
  updateCoursEnseignant,
  deleteCoursEnseignant,
  getCoursEnseignantByIdClasse,
};
