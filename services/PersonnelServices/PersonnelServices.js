const personnelDao = require("../../dao/PersonnelDao/PersonnelDao");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDb } = require("../../config/dbSwitcher");

const registerPersonnelDao = async (userData, documents = [], useNew) => {
  try {
    const db = await getDb(useNew);
    const savedFiles = await saveDocumentToServer(documents);
    if (savedFiles.length > 0) {
      userData.savedFiles = savedFiles;
    }

    const newPersonnel = await personnelDao.createPersonnel(userData, db);
     console.log("new Personnel service", newPersonnel);
     console.log("personnel from service",newPersonnel)
    return newPersonnel;
  } catch (error) {
    console.error("Error registering personnel:", error);
    throw new Error("Failed to register personnel");
  }
};

const getPersonnelsDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await personnelDao.getPersonnels(db);
  return result;
};

const deletePersonnelDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await personnelDao.deletePersonnel(id, db);
};

const updatePersonnelDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await personnelDao.updatePersonnel(id, updateData, db);
};

const getPersonnelDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await personnelDao.getPersonnelById(id, db);
};

const login = async (cin, password, useNew) => {
  const db = await getDb(useNew);
  const personnel = await personnelDao.getPersonnelByCIN(cin, db);

  if (!personnel) {
    throw new Error("Personnel not found");
  }

  if (await bcrypt.compare(password, personnel.password)) {
    const accessToken = jwt.sign({ login: personnel.num_CIN }, "yourSecretKey");

    await personnelDao.updateJwtToken(personnel._id, String(accessToken), db);

    let updatedPersonnel = await personnelDao.getPersonnelById(
      personnel._id,
      db
    );

    return updatedPersonnel;
  } else {
    throw new Error("Incorrect password");
  }
};

const logoutPersonnel = async (personnelId, useNew) => {
  const db = await getDb(useNew);
  return await personnelDao.logoutPersonnel(personnelId, db);
};

async function saveDocumentToServer(documents) {
  const savedPaths = [];
  for (const file of documents) {
    try {
      const savedPath = await saveAdministrativeFile(file);
      savedPaths.push(savedPath);
    } catch (error) {
      console.error(`Failed to save file ${file.name}:`, error);
    }
  }
  return savedPaths;
}

async function saveAdministrativeFile(file) {
  if (!file || !file.base64String) {
    throw new Error("Invalid document: Missing base64String");
  }

  const { base64String, name, path: filePath } = file;

  const buffer = Buffer.from(base64String, "base64");

  const fullFilePath = path.join(filePath, name);

  try {
    await fs.promises.mkdir(filePath, { recursive: true });

    await fs.promises.writeFile(fullFilePath, buffer);

    return fullFilePath;
  } catch (error) {
    console.error(`Error saving file ${name}:`, error);
    throw error;
  }
}

module.exports = {
  registerPersonnelDao,
  getPersonnelsDao,
  deletePersonnelDao,
  updatePersonnelDao,
  getPersonnelDaoById,
  login,
  logoutPersonnel,
};
