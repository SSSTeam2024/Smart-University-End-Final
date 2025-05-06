const absenceEtudiantDao = require("../../dao/AbsenceEtudiantDao/AbsenceEtudiantDao");

const { getDb } = require("../../config/dbSwitcher");

const createAbsenceEtudiant = async (absenceEtudiantData, useNew) => {
  const db = await getDb(useNew);
  return await absenceEtudiantDao.createAbsenceEtudiant(
    absenceEtudiantData,
    db
  );
};

const updateAbsenceEtudiant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await absenceEtudiantDao.updateAbsenceEtudiant(id, updateData, db);
};

const getAbsenceEtudiantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await absenceEtudiantDao.getAbsenceEtudiantById(id, db);
};

const getAbsenceEtudiants = async (useNew) => {
  const db = await getDb(useNew);
  return await absenceEtudiantDao.getAllAbsenceEtudiants(db);
};

const deleteAbsenceEtudiant = async (id, useNew) => {
  const db = await getDb(useNew);
  return await absenceEtudiantDao.deleteAbsenceEtudiant(id, db);
};

const getAllAbsenceClasse = async (id, useNew) => {
  const db = await getDb(useNew);
  return await absenceEtudiantDao.getAllAbsenceClasse(id, db);
};

const getHistoriqueAbsenceByTeacherId = async (teacherId, useNew) => {
  if (!teacherId) {
    throw new Error("Teacher ID is required");
  }
  const db = await getDb(useNew);
  return await absenceEtudiantDao.getAbsencesByTeacherId(teacherId, db);
};

module.exports = {
  createAbsenceEtudiant,
  updateAbsenceEtudiant,
  getAbsenceEtudiantById,
  getAbsenceEtudiants,
  deleteAbsenceEtudiant,
  getAllAbsenceClasse,
  getHistoriqueAbsenceByTeacherId,
};
