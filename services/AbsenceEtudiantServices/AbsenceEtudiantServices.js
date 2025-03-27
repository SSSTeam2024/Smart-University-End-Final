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

const getAllAbsenceClasse = async (id) => {
  return await absenceEtudiantDao.getAllAbsenceClasse(id);
};
const getHistoriqueAbsenceByTeacherId = async (teacherId) => {
  if (!teacherId) {
    throw new Error("Teacher ID is required");
  }

  return await absenceEtudiantDao.getAbsenceEtudiantById(teacherId);
};
module.exports = {
  createAbsenceEtudiant,
  updateAbsenceEtudiant,
  getAbsenceEtudiantById,
  getAbsenceEtudiants,
  deleteAbsenceEtudiant,
  getAllAbsenceClasse,
  getHistoriqueAbsenceByTeacherId
};
