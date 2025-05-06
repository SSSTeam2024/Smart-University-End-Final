const templateBodyDao = require("../../dao/TemplateBodyDao/templateBodyDao");
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

const createTemplateBody = async (templateBodyData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await templateBodyDao.createTemplateBody(templateBodyData);
  } catch (error) {
    console.error("Error creating Model:", error);
    throw error;
  }
};

const getTemplateBodys = async () => {
  const result = await templateBodyDao.getTemplateBodys();
  return result;
};
const getTemplateBodyById = async (id) => {
  try {
    return await templateBodyDao.getTemplateBodyById(id);
  } catch (error) {
    console.error("Error fetching template body by ID:", error);
    throw error;
  }
};

const deleteTemplateBody = async (id) => {
  const result = await templateBodyDao.deleteTemplateBody(id);
  return result;
};

const getTemplateBodyByContext = async (intended_for) => {
  const result = await templateBodyDao.getTemplateBodyByContext(intended_for);
  return result;
};
const updateTemplateBodyById = async (id, data) => {
  if (!id) throw new Error("ID du modèle requis");
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Aucune donnée fournie pour la mise à jour");
  }

  const updatedTemplate = await templateBodyDao.updateTemplateBody(id, data);
  if (!updatedTemplate) {
    throw new Error("Modèle introuvable ou échec de la mise à jour");
  }

  return updatedTemplate;
};



module.exports = {
  createTemplateBody,
  getTemplateBodys,
  getTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
  updateTemplateBodyById
};