const demandeEtudiantDao = require("../../dao/DemandeEtudiantDao/DemandeEtudiantDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");
const generatedDocService = require("../GeneratedDocServices/GeneratedDocServices");
const fs = require("fs").promises;
const fsv1 = require("fs");
const globalFunctions = require("../../utils/globalFunctions");

const { getDb } = require("../../config/dbSwitcher");

// const createDemandeEtudiant = async (demandeEtudiantData, useNew) => {
//   const db = await getDb(useNew);
//   return await demandeEtudiantDao.createDemandeEtudiant(
//     demandeEtudiantData,
//     db
//   );
// };

const createDemandeEtudiant = async (demandeEtudiantData, useNew) => {
  const db = await getDb(useNew);
  const existingDemande = await demandeEtudiantDao.findExistingPendingDemande({
    studentId: demandeEtudiantData.studentId,
    piece_demande: demandeEtudiantData.piece_demande,
    langue: demandeEtudiantData.langue,
  }, db);

  if (existingDemande) {
    throw new Error("Une demande similaire est déjà en attente.");
  }

  return demandeEtudiantDao.createDemandeEtudiant(demandeEtudiantData, db);
};

const getAllDemandeEtudiants = async (useNew) => {
  const db = await getDb(useNew);
  return demandeEtudiantDao.getAllDemandeEtudiants(db);
};

const getDemandeEtudiantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEtudiantDao.getDemandeEtudiantById(id, db);
};

// const updateDemandeEtudiant = async (id, updateData, useNew) => {
//   const db = await getDb(useNew);
//   return demandeEtudiantDao.updateDemandeEtudiant(id, updateData, db);
// };
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
    fsv1.writeFile(filePath, binaryData, "binary", (err) => {
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


const updateDemandeEtudiant = async (id, updateData, documents, useNew) => {
  const db = await getDb(useNew);
  if (documents.length > 0) {
    saveResult = await saveDocumentToServer(documents);
  }
  return demandeEtudiantDao.updateDemandeEtudiant(id, updateData, db);
};

// const deleteDemandeEtudiant = async (id, useNew) => {
//   const db = await getDb(useNew);
//   const toBeDeleted = await demandeEtudiantDao.getDemandeEtudiantById(id, db);

//   const result = await demandeEtudiantDao.deleteDemandeEtudiant(id, db);

//   if (toBeDeleted.status === 'traité') {
//     const oldPdfFileName = toBeDeleted.generated_doc;

//     const oldDoxFileName = oldPdfFileName.replace(/\.[^/.]+$/, ".docx");

//     const restul2 = await generatedDocService.deleteGeneratedDocByDocName(oldPdfFileName, useNew)

//     try {
//       fs.unlink(`./files/generated_docs/docx/student_docx/${oldDoxFileName}`, (err) => {
//         conso.log(err);
//         if (err) {
//           console.error('Error deleting the file:', err);
//         } else {
//           console.log('File deleted successfully');
//         }
//       });

//       fs.unlink(`./files/generated_docs/pdf/student_pdf/${oldPdfFileName}`, (err) => {
//         conso.log(err);
//         if (err) {
//           console.error('Error deleting the file:', err);
//         } else {
//           console.log('File deleted successfully');
//         }
//       });

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return result;
// };

const deleteDemandeEtudiant = async (id, useNew) => {
  const db = await getDb(useNew);

  // const toBeDeleted = await demandeEtudiantDao.getDemandeEtudiantById(id, db);

  const result = await demandeEtudiantDao.deleteDemandeEtudiant(id, db);

  // if (toBeDeleted.status !== 'Approuvée' || toBeDeleted.status !== 'Réfusée') {
  //   const oldPdfFileName = toBeDeleted.generated_doc;

  //   const oldDoxFileName = oldPdfFileName.replace(/\.[^/.]+$/, ".docx");

  //   const restul2 = await generatedDocService.deleteGeneratedDocByDocName(oldPdfFileName, useNew)

  //   try {
  //     fs.unlink(`./files/generated_docs/docx/student_docx/${oldDoxFileName}`, (err) => {
  //       conso.log(err);
  //       if (err) {
  //         console.error('Error deleting the file:', err);
  //       } else {
  //         console.log('File deleted successfully');
  //       }
  //     });

  //     fs.unlink(`./files/generated_docs/pdf/student_pdf/${oldPdfFileName}`, (err) => {
  //       conso.log(err);
  //       if (err) {
  //         console.error('Error deleting the file:', err);
  //       } else {
  //         console.log('File deleted successfully');
  //       }
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return result;
};
const getDemandesByStudentId = async (studentId, useNew) => {
  const db = await getDb(useNew);
  return await demandeEtudiantDao.getDemandesByStudentId(studentId, db);
};

const deleteManyDemandesEtudiants = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await demandeEtudiantDao.deleteManyDemandeEtudiants(db, ids);
};

// const handleDemandeEtudiant = async (
//   demandId,
//   fileName,
//   modelLangage,
//   useNew
// ) => {
//   const db = await getDb(useNew);
//   const [fileNamePart1, fileNamePart2] = fileName.split(".");
//   const generatedDocInfo = await shortCodesReplacer.generateDoc(
//     fileNamePart1,
//     "student",
//     demandId,
//     modelLangage,
//     db
//   );
//   await wordToPdfTransformer.transform(
//     fileNamePart1,
//     "student",
//     demandId,
//     generatedDocInfo,
//     db
//   );
//   const result = await demandeEtudiantDao.updateDemandeEtudiant(
//     demandId,
//     { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` },
//     db
//   );
//   return result;
// };
const handleDemandeEtudiant = async (
  demandId,
  fileName,
  modelLangage,
  status_history,
  useNew
) => {
  const db = await getDb(useNew);
  console.log("result service student", demandId, fileName, modelLangage, status_history);
  const [fileNamePart1, fileNamePart2] = fileName.split(".");
  const generatedDocInfo = await shortCodesReplacer.generateDoc(
    fileNamePart1,
    "student",
    demandId,
    modelLangage,
    db
  );
  await wordToPdfTransformer.transform(
    fileNamePart1,
    "student",
    demandId,
    generatedDocInfo,
    db
  );
  const result = await demandeEtudiantDao.updateDemandeEtudiant(
    demandId,
    { current_status: "Générée", generated_doc: `${demandId}_${fileNamePart1}.pdf`, status_history: status_history },
    db
  );
  return result;
};

const getDemandesByAdminId = async (adminId, useNew) => {
  const db = await getDb(useNew);
  return await demandeEtudiantDao.getDemandesByAdminId(adminId, db);
};
module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant,
  getDemandesByStudentId,
  deleteManyDemandesEtudiants,
  handleDemandeEtudiant,
  getDemandesByAdminId
};
