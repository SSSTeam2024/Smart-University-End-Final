const templateBodyDao = require("../../dao/TemplateBodyDao/templateBodyDao");
const { getDb } = require("../../config/dbSwitcher");
const userDao = require("../../dao/userDao/userDao")

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

const createTemplateBody = async (templateBodyData, documents, useNew) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await templateBodyDao.createTemplateBody(templateBodyData, db);
  } catch (error) {
    console.error("Error creating Model:", error);
    throw error;
  }
};

const getTemplateBodys = async (useNew) => {
  const db = await getDb(useNew);
  const result = await templateBodyDao.getTemplateBodys(db);
  // const admins = await userDao.getAllUsers(db);
  // const adminIds = admins.map((admin) => admin._id);
  // await templateBodyDao.updateAmdinsInCharge(adminIds, db);

  return result;
};

const getTemplateBodyById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await templateBodyDao.getTemplateBodyById(id, db);
  } catch (error) {
    console.error("Error fetching template body by ID:", error);
    throw error;
  }
};

const deleteTemplateBody = async (id, useNew) => {
  const db = await getDb(useNew);
  const toBeDeleted = await templateBodyDao.getTemplateBodyById(id, db);
  const oldFileName = toBeDeleted.doc;
  const result = await templateBodyDao.deleteTemplateBody(id, db);

  try {
    fs.unlink(`./files/Modeles/${oldFileName}`, (err) => {
      conso.log(err);
      if (err) {
        console.error('Error deleting the file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

  } catch (error) {
    console.log(error);
  }

  return result;
};

const getTemplateBodyByContext = async (intended_for, useNew) => {
  const db = await getDb(useNew);
  const result = await templateBodyDao.getTemplateBodyByContext(
    intended_for,
    db
  );
  return result;
};
//get templates by admin id
const getTemplateBodiesByAdminId = async (adminId, useNew) => {
  const db = await getDb(useNew);
  return await templateBodyDao.getTemplateBodiesByAdminId(adminId, db);
}

const updateTemplateBodyById = async (id, data, documents,
  oldFileName, useNew) => {
  const db = await getDb(useNew);
  if (!id) throw new Error("ID du modèle requis");
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Aucune donnée fournie pour la mise à jour");
  }

  const updatedTemplate = await templateBodyDao.updateTemplateBody(
    id,
    data,
    db
  );
  if (!updatedTemplate) {
    throw new Error("Modèle introuvable ou échec de la mise à jour");
  }

  if (documents.length !== 0) {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    try {
      fs.unlink(`./files/Modeles/${oldFileName}`, (err) => {
        conso.log(err);
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });

    } catch (error) {
      console.log(error);
    }

  }

  return updatedTemplate;
};

module.exports = {
  createTemplateBody,
  getTemplateBodys,
  getTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
  updateTemplateBodyById,
  getTemplateBodiesByAdminId
};
