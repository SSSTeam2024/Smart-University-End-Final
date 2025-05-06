const etudiantDao = require("../../dao/studentDao/studentDao");
const fs = require("fs");
const path = require("path");
const globalFunctions = require("../../utils/globalFunctions");
const emailService = require("../EmailServices/emailService");
const emailStructure = require("../../utils/emailInscription");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDb } = require("../../config/dbSwitcher");

const registerEtudiant = async (userData, documents = [], useNew) => {
  try {
    const db = await getDb(useNew);
    let saveResult = true;

    if (documents.length > 0) {
      saveResult = await saveDocumentToServer(documents);
    }

    if (saveResult) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newEtudiant = await etudiantDao.createEudiant({
        ...userData,
        password: hashedPassword,
        db,
      });

      // const email = prepareEmailInscription(
      //   userData.email,
      //   userData.prenom_fr,
      //   userData.nom_fr,
      //   userData.code_acces,
      //   userData.num_CIN,
      //   newEtudiant.createdAt
      // );
      // await emailService.sendEmail(email);

      return newEtudiant;
    } else {
      throw new Error("Failed to save documents.");
    }
  } catch (error) {
    console.error("Error registering etudiant:", error);
    throw error;
  }
};

async function saveDocumentToServer(documents) {
  if (!documents || documents.length === 0) {
    return true;
  }
  let counter = 0;
  for (const file of documents) {
    await saveFile(file.base64String, file.name, file.path);
    counter++;
  }
  return counter === documents.length;
}

async function saveFile(base64String, fileName, file_path) {
  if (!base64String) {
    console.warn(`Skipping file ${fileName}: No base64 data provided.`);
    return;
  }

  const binaryData = Buffer.from(base64String, "base64");
  const filePath = file_path + fileName;
  await globalFunctions.ensureDirectoryExistence(file_path);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, binaryData, "binary", (err) => {
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

function prepareEmailInscription(email, prenom, nom, code, cin, date) {
  let recipient = email;
  let pwd = String(cin).split("").reverse().join("");
  let formattedDate = new Date(date)
    .toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  let emailBody = emailStructure.emailTemplates.email_inscription(
    prenom,
    nom,
    code,
    pwd,
    cin,
    formattedDate
  );
  let emailSubject = "Confirmation d'inscription et code d'accès";
  let fullEmailObject = {
    to: recipient,
    subject: emailSubject,
    body: emailBody,
  };
  return fullEmailObject;
}

const getEtudiants = async (useNew) => {
  const db = await getDb(useNew);
  const result = await etudiantDao.getEtudiants(db);
  return result;
};

const getEtudiantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return etudiantDao.getEtudiantById(id, db);
};

const deleteEtudiant = async (id, useNew) => {
  const db = await getDb(useNew);
  return await etudiantDao.deleteEtudiant(id, db);
};

const updateEtudiant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await etudiantDao.updateEtudiant(id, updateData, db);
};

const getTypeInscriptionByIdStudent = async (studentId, useNew) => {
  try {
    const db = await getDb(useNew);
    const typeInscription = await etudiantDao.getTypeInscriptionByIdStudent(
      studentId,
      db
    );
    return typeInscription;
  } catch (error) {
    console.error(
      "Error in service while fetching TypeInscription by Student ID:",
      error
    );
    throw error;
  }
};

const updateGroupeClasse = async (studentIds, groupeClasseId, useNew) => {
  const db = await getDb(useNew);
  const result = await etudiantDao.updateGroupeClasse(
    studentIds,
    groupeClasseId,
    db
  );
  return result;
};

const getEtudiantsByIdClasse = async (classeId, useNew) => {
  const db = await getDb(useNew);
  return etudiantDao.getEtudiantsByIdClasse(classeId, db);
};

const getEtudiantByCin = async (cin_etudiant, useNew) => {
  const db = await getDb(useNew);
  return etudiantDao.getEtudiantByCIN(cin_etudiant, db);
};

const getEtudiatByCinAndCode = async (cin_etudiant, codesecret, useNew) => {
  const db = await getDb(useNew);
  return etudiantDao.getEtudiantByCinAndCode(cin_etudiant, codesecret, db);
};

const login = async (cin, password, useNew) => {
  const db = await getDb(useNew);
  const etudiant = await etudiantDao.getEtudiantByCIN(cin, db);

  if (!etudiant) {
    throw new Error("Etudiant not found");
  }

  if (await bcrypt.compare(password, etudiant.password)) {
    const accessToken = jwt.sign({ login: etudiant.num_CIN }, "yourSecretKey");

    await etudiantDao.updateJwtToken(etudiant._id, String(accessToken));

    let updatedEtudiant = await etudiantDao.getEtudiantById(etudiant._id, db);

    return updatedEtudiant;
  } else {
    throw new Error("Incorrect password");
  }
};

const getEtudiantByToken = async (token, useNew) => {
  const db = await getDb(useNew);
  return await etudiantDao.findEtudiantByToken(token, db);
};

const getNbrEtudiantsByClasses = async (classeIds, useNew) => {
  const db = await getDb(useNew);
  let nbr = 0;
  for (const classId of classeIds) {
    const students = await etudiantDao.getEtudiantsByIdClasse(classId, db);
    nbr += students.length;
  }
  return nbr;
};

const logoutEtudiant = async (studentId, useNew) => {
  const db = await getDb(useNew);
  return await etudiantDao.logoutEtudiant(studentId, db);
};

module.exports = {
  getEtudiants,
  getEtudiantById,
  registerEtudiant,
  deleteEtudiant,
  updateEtudiant,
  getTypeInscriptionByIdStudent,
  updateGroupeClasse,
  getEtudiantsByIdClasse,
  getEtudiantByCin,
  getEtudiatByCinAndCode,
  login,
  getEtudiantByToken,
  getNbrEtudiantsByClasses,
  logoutEtudiant,
};
