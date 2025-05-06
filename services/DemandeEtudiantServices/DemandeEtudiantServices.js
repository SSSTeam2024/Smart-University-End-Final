const demandeEtudiantDao = require('../../dao/DemandeEtudiantDao/DemandeEtudiantDao');
const shortCodesReplacer = require('../../utils/documents-processing/easy-template-x');
const wordToPdfTransformer = require('../../files/libreoffice');

const createDemandeEtudiant = async (demandeEtudiantData) => {
  return await demandeEtudiantDao.createDemandeEtudiant(demandeEtudiantData);
};

const getAllDemandeEtudiants = async () => {
  return demandeEtudiantDao.getAllDemandeEtudiants();
};

const getDemandeEtudiantById = async (id) => {
  return demandeEtudiantDao.getDemandeEtudiantById(id);
};

const updateDemandeEtudiant = async (id, updateData) => {
  return demandeEtudiantDao.updateDemandeEtudiant(id, updateData);
};

const deleteDemandeEtudiant = async (id) => {
  return demandeEtudiantDao.deleteDemandeEtudiant(id);
};

const getDemandesByStudentId = async (studentId) => {
  return await demandeEtudiantDao.getDemandesByStudentId(studentId);
};

const handleDemandeEtudiant = async (demandId, fileName, modelLangage) => {
  const [fileNamePart1, fileNamePart2] = fileName.split('.');
  const generatedDocInfo = await shortCodesReplacer.generateDoc(fileNamePart1, 'student', demandId, modelLangage);
  await wordToPdfTransformer.transform(fileNamePart1, 'student', demandId, generatedDocInfo);
  const result = await demandeEtudiantDao.updateDemandeEtudiant(demandId, { status: "traité", generated_doc: `${demandId}_${fileNamePart1}.pdf` });
  return result;
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant,
  getDemandesByStudentId,
  handleDemandeEtudiant
};