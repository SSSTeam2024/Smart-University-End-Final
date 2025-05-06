const demandePersonnelDao = require("../../dao/DemandePersonnelDao/DemandePersonnelDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");
const { getDb } = require("../../config/dbSwitcher");

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

const updateDemandePersonnel = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.updateDemandePersonnel(id, updateData, db);
};

const deleteDemandePersonnel = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.deleteDemandePersonnel(id, db);
};

const deleteManyDemandePersonnel = async (useNew, ids) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.deleteManyDemandePersonnel(db, ids);
};

const handleDemandePersonnel = async (demandId, fileName, modelLangage) => {
  const db = await getDb(useNew);
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
    { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` },
    db
  );
  return result;
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  deleteManyDemandePersonnel,
  handleDemandePersonnel,
};
