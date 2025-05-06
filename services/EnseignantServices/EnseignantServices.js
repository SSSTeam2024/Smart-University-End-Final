const enseignantDao = require("../../dao/EnseignantDao/EnseignantDao");
const enseignantSchema = require("../../model/EnseignantModel/EnseignantModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDb } = require("../../config/dbSwitcher");

function getEnseignantModel(dbConnection) {
  return (
    dbConnection.models.Enseignant ||
    dbConnection.model("Enseignant", enseignantSchema)
  );
}

const registerEnseignantDao = async (
  enseignantData,
  documents = [],
  useNew
) => {
  try {
    const db = await getDb(useNew);
    const savedFiles = await saveDocumentToServer(documents);

    if (savedFiles.length > 0) {
      enseignantData.savedFiles = savedFiles;
    }
    console.log("enseignantData services", enseignantData);
    const hashedPassword = await bcrypt.hash(enseignantData.password, 10);
    const newEnseignant = await enseignantDao.createEnseignant(
      {
        ...enseignantData,
        password: hashedPassword,
      },
      db
    );
    console.log("newEnseignant", newEnseignant);
    return newEnseignant;
  } catch (error) {
    console.error("Error registering enseignant:", error);
    throw new Error("Failed to register enseignant");
  }
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

const getEnseignatsDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await enseignantDao.getEnseignants(db);
  return result;
};

const deleteEnseignantDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await enseignantDao.deleteEnseignant(id, db);
};
const updateEnseignantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await enseignantDao.updateEnseignant(id, updateData, db);
};

const getEnseignantDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await enseignantDao.getEnseignantById(id, db);
};

const assignPapierToTeacher = async (enseignantId, papierIds, useNew) => {
  try {
    const db = await getDb(useNew);
    const Enseignant = await getEnseignantModel(dbName);
    const enseignant = await Enseignant.findById(enseignantId);
    if (!enseignant) {
      throw new Error("Enseignant not found");
    }
    for (const paperId of papierIds) {
      enseignant.papers.push(paperId);
    }

    await enseignant.save();
    return enseignant;
  } catch (error) {
    console.error("Error in assignPapierToTeacher:", error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};

const fetchAllTeachersPeriods = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const teachersPeriods = await enseignantDao.fetchAllTeachersPeriods(db);

    return teachersPeriods;
  } catch (error) {
    throw new Error("Error processing teachers' periods: " + error.message);
  }
};
const getTeachersGroupedByGrade = async (useNew) => {
  const db = await getDb(useNew);
  const result = await enseignantDao.getTeachersGroupedByGrade(db);
  return result;
};

const login = async (cin, password, useNew) => {
  const db = await getDb(useNew);
  const teacher = await enseignantDao.getTeacherByCIN(cin, db);

  if (!teacher) {
    throw new Error("teacher not found");
  }

  if (await bcrypt.compare(password, teacher.password)) {
    const accessToken = jwt.sign({ login: teacher.num_cin }, "yourSecretKey");

    await enseignantDao.updateJwtToken(teacher._id, String(accessToken), db);

    let updatedTeacher = await enseignantDao.getEnseignantById(teacher._id);

    return updatedTeacher;
  } else {
    throw new Error("Incorrect password");
  }
};

const getEtudiantByCin = async (cin_teacher, useNew) => {
  const db = await getDb(useNew);
  return enseignantDao.getTeacherByCIN(cin_teacher, db);
};

const logoutTeacher = async (teacherId, useNew) => {
  const db = await getDb(useNew);
  return await enseignantDao.logoutTeacher(teacherId, db);
};

module.exports = {
  registerEnseignantDao,
  getEnseignatsDao,
  deleteEnseignantDao,
  updateEnseignantDao,
  getEnseignantDaoById,
  assignPapierToTeacher,
  fetchAllTeachersPeriods,
  getTeachersGroupedByGrade,
  login,
  getEtudiantByCin,
  logoutTeacher,
};
