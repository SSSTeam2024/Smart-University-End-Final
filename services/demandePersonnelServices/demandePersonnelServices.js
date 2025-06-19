const demandePersonnelDao = require("../../dao/DemandePersonnelDao/DemandePersonnelDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");
const { getDb } = require("../../config/dbSwitcher");
const generatedDocService = require("../GeneratedDocServices/GeneratedDocServices");
const fsv1 = require("fs");
const globalFunctions = require("../../utils/globalFunctions");

const fs = require("fs").promises;

const createDemandePersonnel = async (demandePersonnelData, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.createDemandePersonnel(demandePersonnelData, db);
};

const getAllDemandePersonnels = async (useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.getAllDemandePersonnels(db);
};

const getDemandePersonnelById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.getDemandePersonnelById(id, db);
};

// const updateDemandePersonnel = async (id, updateData, useNew) => {
//   const db = await getDb(useNew);
//   return demandePersonnelDao.updateDemandePersonnel(id, updateData, db);
// };

const updateDemandePersonnel = async (id, updateData, documents, useNew) => {
  const db = await getDb(useNew);
  if (documents.length > 0) {
    saveResult = await saveDocumentToServer(documents);
  }
  return demandePersonnelDao.updateDemandePersonnel(id, updateData, db);
};

// const deleteDemandePersonnel = async (id, useNew) => {
//   const db = await getDb(useNew);
//   // return demandePersonnelDao.deleteDemandePersonnel(id, db);
//   const toBeDeleted = await demandePersonnelDao.getDemandePersonnelById(id, db);

//   const result = await demandePersonnelDao.deleteDemandePersonnel(id, db);

//   if (toBeDeleted.status === 'traité') {
//     const oldPdfFileName = toBeDeleted.generated_doc;

//     const oldDoxFileName = oldPdfFileName.replace(/\.[^/.]+$/, ".docx");

//     const restul2 = await generatedDocService.deleteGeneratedDocByDocName(oldPdfFileName, useNew)

//     try {
//       fs.unlink(`./files/generated_docs/docx/employee_docx/${oldDoxFileName}`, (err) => {
//         conso.log(err);
//         if (err) {
//           console.error('Error deleting the file:', err);
//         } else {
//           console.log('File deleted successfully');
//         }
//       });

//       fs.unlink(`./files/generated_docs/pdf/employee_pdf/${oldPdfFileName}`, (err) => {
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


const deleteDemandePersonnel = async (id, useNew) => {
  const db = await getDb(useNew);

  const toBeDeleted = await demandePersonnelDao.getDemandeByPersonnelId(id, db);

  const result = await demandePersonnelDao.deleteDemandePersonnel(id, db);

  if (toBeDeleted.status !== 'Approuvée' || toBeDeleted.status !== 'Réfusée') {
    const oldPdfFileName = toBeDeleted.generated_doc;

    const oldDoxFileName = oldPdfFileName.replace(/\.[^/.]+$/, ".docx");

    const restul2 = await generatedDocService.deleteGeneratedDocByDocName(oldPdfFileName, useNew)

    try {
      fs.unlink(`./files/generated_docs/docx/employee_docx/${oldDoxFileName}`, (err) => {
        conso.log(err);
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });

      fs.unlink(`./files/generated_docs/pdf/employee_pdf/${oldPdfFileName}`, (err) => {
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
  return result;
};
const deleteManyDemandePersonnel = async (useNew, ids) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.deleteManyDemandePersonnel(db, ids);
};

// const handleDemandePersonnel = async (
//   demandId,
//   fileName,
//   modelLangage,
//   useNew
// ) => {
//   const db = await getDb(useNew);
//   const [fileNamePart1, fileNamePart2] = fileName.split(".");
//   const generatedDocInfo = await shortCodesReplacer.generateDoc(
//     fileNamePart1,
//     "employee",
//     demandId,
//     modelLangage,
//     db
//   );
//   await wordToPdfTransformer.transform(
//     fileNamePart1,
//     "employee",
//     demandId,
//     generatedDocInfo,
//     db
//   );
//   const result = await demandePersonnelDao.updateDemandePersonnel(
//     demandId,
//     { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` },
//     db
//   );
//   return result;
// };

const handleDemandePersonnel = async (
  demandId,
  fileName,
  modelLangage,
  status_history,
  useNew
) => {
  const db = await getDb(useNew);
  console.log("result service personnel", demandId, fileName, modelLangage, status_history);
  const [fileNamePart1, fileNamePart2] = fileName.split(".");
  const generatedDocInfo = await shortCodesReplacer.generateDoc(
    fileNamePart1,
    "employee",
    demandId,
    modelLangage,
    db
  );
  await wordToPdfTransformer.transform(
    fileNamePart1,
    "employee",
    demandId,
    generatedDocInfo,
    db
  );
  const result = await demandePersonnelDao.updateDemandePersonnel(
    demandId,
    { current_status: "Générée", generated_doc: `${demandId}_${fileNamePart1}.pdf`, status_history: status_history },
    db
  );
  return result;
};

const getDemandesByPersonnelId = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return demandePersonnelDao.getDemandeByPersonnelId(id, db);
  } catch (error) {
    console.error(
      "Error while fetching demandes by personnel id in services",
      error
    );
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

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  deleteManyDemandePersonnel,
  handleDemandePersonnel,
  getDemandesByPersonnelId,
};
