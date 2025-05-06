const demandePersonnelDao = require('../../dao/DemandePersonnelDao/DemandePersonnelDao');
const shortCodesReplacer = require('../../utils/documents-processing/easy-template-x');
const wordToPdfTransformer = require('../../files/libreoffice');

const createDemandePersonnel = async (demandePersonnelData) => {
  return demandePersonnelDao.createDemandePersonnel(demandePersonnelData);
};

const getAllDemandePersonnels = async () => {
  return demandePersonnelDao.getAllDemandePersonnels();
};

const getDemandePersonnelById = async (id) => {
  return demandePersonnelDao.getDemandePersonnelById(id);
};

const updateDemandePersonnel = async (id, updateData) => {
  return demandePersonnelDao.updateDemandePersonnel(id, updateData);
};

const deleteDemandePersonnel = async (id) => {
  return demandePersonnelDao.deleteDemandePersonnel(id);
};

const handleDemandePersonnel = async (demandId, fileName, modelLangage) => {
  const [fileNamePart1, fileNamePart2] = fileName.split('.');
  const generatedDocInfo = await shortCodesReplacer.generateDoc(fileNamePart1, 'employee', demandId, modelLangage);
  await wordToPdfTransformer.transform(fileNamePart1, 'employee', demandId, generatedDocInfo);
  const result = await demandePersonnelDao.updateDemandePersonnel(demandId, { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` });
  return result;
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  handleDemandePersonnel
};