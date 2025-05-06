const demandeEtudiantDao = require("../../dao/DemandeEtudiantDao/DemandeEtudiantDao");

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

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant,
  getDemandesByStudentId,
  deleteManyDemandesEtudiants,
};
