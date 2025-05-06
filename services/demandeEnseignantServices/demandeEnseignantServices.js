const demandeEnseignantDao = require('../../dao/DemandeEnseignantDao/DemandeEnseignantDao');
const shortCodesReplacer = require('../../utils/documents-processing/easy-template-x');
const wordToPdfTransformer = require('../../files/libreoffice');

const createDemandeEnseignant = async (demandeEnseignantData) => {
  return demandeEnseignantDao.createDemandeEnseignant(demandeEnseignantData);
};

const getAllDemandeEnseignants = async () => {
  return demandeEnseignantDao.getAllDemandeEnseignants();
};

const getDemandeEnseignantById = async (id) => {
  return demandeEnseignantDao.getDemandeEnseignantById(id);
};

const updateDemandeEnseignant = async (id, updateData) => {
  return demandeEnseignantDao.updateDemandeEnseignant(id, updateData);
};

const deleteDemandeEnseignant = async (id) => {
  return demandeEnseignantDao.deleteDemandeEnseignant(id);
};
const getDemandesByTeacherId = async (enseignantId) => {
  return await demandeEnseignantDao.getDemandesByTeacherId(enseignantId);
};

const handleDemandeEnseignant = async (demandId, fileName, modelLangage) => {
  console.log("result service enseigant", demandId, fileName, modelLangage)
  const [fileNamePart1, fileNamePart2] = fileName.split('.');
  const generatedDocInfo = await shortCodesReplacer.generateDoc(fileNamePart1, 'teacher', demandId, modelLangage);
  await wordToPdfTransformer.transform(fileNamePart1, 'teacher', demandId, generatedDocInfo);
  const result = await demandeEnseignantDao.updateDemandeEnseignant(demandId, { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` });
  return result;
};
module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId,
  handleDemandeEnseignant
};