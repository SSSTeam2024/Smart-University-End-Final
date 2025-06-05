const demandeEtudiantDao = require("../../dao/DemandeEtudiantDao/DemandeEtudiantDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");
const generatedDocService = require("../GeneratedDocServices/GeneratedDocServices");
const fs = require("fs").promises;

const { getDb } = require("../../config/dbSwitcher");

const createDemandeEtudiant = async (demandeEtudiantData, useNew) => {
  const db = await getDb(useNew);
  return await demandeEtudiantDao.createDemandeEtudiant(
    demandeEtudiantData,
    db
  );
};

const getAllDemandeEtudiants = async (useNew) => {
  const db = await getDb(useNew);
  return demandeEtudiantDao.getAllDemandeEtudiants(db);
};

const getDemandeEtudiantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEtudiantDao.getDemandeEtudiantById(id, db);
};

const updateDemandeEtudiant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return demandeEtudiantDao.updateDemandeEtudiant(id, updateData, db);
};

const deleteDemandeEtudiant = async (id, useNew) => {
  const db = await getDb(useNew);
  const toBeDeleted = await demandeEtudiantDao.getDemandeEtudiantById(id, db);

  const result = await demandeEtudiantDao.deleteDemandeEtudiant(id, db);

  if (toBeDeleted.status === 'traité') {
    const oldPdfFileName = toBeDeleted.generated_doc;

    const oldDoxFileName = oldPdfFileName.replace(/\.[^/.]+$/, ".docx");

    const restul2 = await generatedDocService.deleteGeneratedDocByDocName(oldPdfFileName, useNew)

    try {
      fs.unlink(`./files/generated_docs/docx/student_docx/${oldDoxFileName}`, (err) => {
        conso.log(err);
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });

      fs.unlink(`./files/generated_docs/pdf/student_pdf/${oldPdfFileName}`, (err) => {
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

const getDemandesByStudentId = async (studentId, useNew) => {
  const db = await getDb(useNew);
  return await demandeEtudiantDao.getDemandesByStudentId(studentId, db);
};

const deleteManyDemandesEtudiants = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await demandeEtudiantDao.deleteManyDemandeEtudiants(db, ids);
};

const handleDemandeEtudiant = async (
  demandId,
  fileName,
  modelLangage,
  useNew
) => {
  const db = await getDb(useNew);
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
    { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` },
    db
  );
  return result;
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
};
