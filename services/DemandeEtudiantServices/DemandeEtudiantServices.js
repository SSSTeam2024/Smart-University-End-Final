const demandeEtudiantDao = require("../../dao/DemandeEtudiantDao/DemandeEtudiantDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");

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
  return demandeEtudiantDao.deleteDemandeEtudiant(id, db);
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
