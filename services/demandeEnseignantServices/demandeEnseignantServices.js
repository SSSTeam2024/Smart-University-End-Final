const demandeEnseignantDao = require("../../dao/DemandeEnseignantDao/DemandeEnseignantDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");
const generatedDocService = require("../GeneratedDocServices/GeneratedDocServices");
const fsv1 = require("fs");
const globalFunctions = require("../../utils/globalFunctions");

const fs = require("fs").promises;

const { getDb } = require("../../config/dbSwitcher");

// const createDemandeEnseignant = async (demandeEnseignantData, useNew) => {
//   const db = await getDb(useNew);
//   return demandeEnseignantDao.createDemandeEnseignant(
//     demandeEnseignantData,
//     db
//   );
// };
const createDemandeEnseignant = async (demandeEnseignantData, documents, useNew) => {
  const db = await getDb(useNew);

  // Check for existing demande with same criteria and status "En attente"
  const existingDemande = await demandeEnseignantDao.findExistingPendingDemande({
    enseignantId: demandeEnseignantData.enseignantId,
    piece_demande: demandeEnseignantData.piece_demande,
    langue: demandeEnseignantData.langue,
  }, db);

  if (existingDemande) {
    throw new Error("Une demande similaire est déjà en attente.");
  }
  if (documents.length > 0) {
    saveResult = await saveDocumentToServer(documents);
  }

  return demandeEnseignantDao.createDemandeEnseignant(demandeEnseignantData, db);
};

const getAllDemandeEnseignants = async (useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.getAllDemandeEnseignants(db);
};

const getDemandeEnseignantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.getDemandeEnseignantById(id, db);
};

const updateDemandeEnseignant = async (id, updateData, documents, useNew) => {
  const db = await getDb(useNew);
  if (documents.length > 0) {
    saveResult = await saveDocumentToServer(documents);
  }
  return demandeEnseignantDao.updateDemandeEnseignant(id, updateData, db);
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

const deleteDemandeEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);

  const toBeDeleted = await demandeEnseignantDao.getDemandeEnseignantById(id, db);


  const regex = /extra_files\.(jpeg|png|jpg|pdf|docx)$/;

  for (const extra of toBeDeleted.extra_data) {
    if (regex.test(extra.value)) {
      try {
        fs.unlink(`./files/demandeEnseignant/extraFilesDemande/${extra.value}`, (err) => {
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
  }
  // if (toBeDeleted.status !== 'Approuvée' || toBeDeleted.status !== 'Réfusée') {
  //   const oldPdfFileName = toBeDeleted.generated_doc;

  //   const oldDoxFileName = oldPdfFileName.replace(/\.[^/.]+$/, ".docx");

  //   const restul2 = await generatedDocService.deleteGeneratedDocByDocName(oldPdfFileName, useNew)

  //   try {
  //     fs.unlink(`./files/generated_docs/docx/teacher_docx/${oldDoxFileName}`, (err) => {
  //       conso.log(err);
  //       if (err) {
  //         console.error('Error deleting the file:', err);
  //       } else {
  //         console.log('File deleted successfully');
  //       }
  //     });

  //     fs.unlink(`./files/generated_docs/pdf/teacher_pdf/${oldPdfFileName}`, (err) => {
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
  const result = await demandeEnseignantDao.deleteDemandeEnseignant(id, db);
  return result;
};

const getDemandesByTeacherId = async (enseignantId, useNew) => {
  const db = await getDb(useNew);
  return await demandeEnseignantDao.getDemandesByTeacherId(enseignantId, db);
};

const deleteManyDemandeEnseignant = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await demandeEnseignantDao.deleteManyDemandeEnseignants(db, ids);
};

const handleDemandeEnseignant = async (
  demandId,
  fileName,
  modelLangage,
  status_history,
  useNew
) => {
  const db = await getDb(useNew);
  console.log("result service enseigant", demandId, fileName, modelLangage, status_history);
  const [fileNamePart1, fileNamePart2] = fileName.split(".");
  const generatedDocInfo = await shortCodesReplacer.generateDoc(
    fileNamePart1,
    "teacher",
    demandId,
    modelLangage,
    db
  );
  await wordToPdfTransformer.transform(
    fileNamePart1,
    "teacher",
    demandId,
    generatedDocInfo,
    db
  );
  const result = await demandeEnseignantDao.updateDemandeEnseignant(
    demandId,
    { current_status: "Générée", generated_doc: `${demandId}_${fileNamePart1}.pdf`, status_history: status_history },
    db
  );
  return result;
};

//get demands by id admin

const getDemandesByAdminId = async (adminId, useNew) => {
  const db = await getDb(useNew);
  return await demandeEnseignantDao.getDemandesByAdminId(adminId, db);
};
module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId,
  deleteManyDemandeEnseignant,
  handleDemandeEnseignant,
  getDemandesByAdminId
};
