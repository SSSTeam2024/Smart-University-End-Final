const demandeEnseignantDao = require("../../dao/DemandeEnseignantDao/DemandeEnseignantDao");
const shortCodesReplacer = require("../../utils/documents-processing/easy-template-x");
const wordToPdfTransformer = require("../../files/libreoffice");

const { getDb } = require("../../config/dbSwitcher");

const createDemandeEnseignant = async (demandeEnseignantData, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.createDemandeEnseignant(
    demandeEnseignantData,
    db
  );
};

const getAllDemandeEnseignants = async (useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.getAllDemandeEnseignants(db);
};

const getDemandeEnseignantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.getDemandeEnseignantById(id, db);
};

const updateDemandeEnseignant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.updateDemandeEnseignant(id, updateData, db);
};

const deleteDemandeEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.deleteDemandeEnseignant(id, db);
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
  useNew
) => {
  const db = await getDb(useNew);
  console.log("result service enseigant", demandId, fileName, modelLangage);
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
    { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` },
    db
  );
  return result;
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
};
