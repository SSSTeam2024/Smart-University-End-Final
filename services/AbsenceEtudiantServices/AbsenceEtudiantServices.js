const absenceEtudiantDao = require("../../dao/AbsenceEtudiantDao/AbsenceEtudiantDao");

const createAbsenceEtudiant = async (absenceEtudiantData) => {
  return await absenceEtudiantDao.createAbsenceEtudiant(absenceEtudiantData);
};

const updateAbsenceEtudiant = async (id, updateData) => {
  return await absenceEtudiantDao.updateAbsenceEtudiant(id, updateData);
};

const getAbsenceEtudiantById = async (id) => {
  return await absenceEtudiantDao.getAbsenceEtudiantById(id);
};

const getAbsenceEtudiants = async () => {
  return await absenceEtudiantDao.getAllAbsenceEtudiants();
};

const deleteAbsenceEtudiant = async (id) => {
  return await absenceEtudiantDao.deleteAbsenceEtudiant(id);
};

module.exports = {
  createAbsenceEtudiant,
  updateAbsenceEtudiant,
  getAbsenceEtudiantById,
  getAbsenceEtudiants,
  deleteAbsenceEtudiant,
};
