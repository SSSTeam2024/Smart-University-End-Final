const absencePersonnelDao = require("../../dao/AbsencePersonnelDao/AbsencePersonnelDao");

const { getDb } = require("../../config/dbSwitcher");

const createAbsencePersonnel = async (absencePersonnelData, useNew) => {
  const db = await getDb(useNew);
  return await absencePersonnelDao.createAbsencePersonnel(
    absencePersonnelData,
    db
  );
};

const getAllAbsencesPersonnels = async (useNew) => {
  const db = await getDb(useNew);
  return absencePersonnelDao.getAllAbsencesPersonnels(db);
};

const getAbsencePersonnelById = async (id, useNew) => {
  const db = await getDb(useNew);
  return absencePersonnelDao.getAbsencePersonnelById(id, db);
};

const updateAbsencePersonnel = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await absencePersonnelDao.updateAbsencePersonnel(id, updateData, db);
};

const deleteAbsencePersonnel = async (id, useNew) => {
  const db = await getDb(useNew);
  return absencePersonnelDao.deleteAbsencePersonnel(id, db);
};

module.exports = {
  createAbsencePersonnel,
  getAllAbsencesPersonnels,
  getAbsencePersonnelById,
  updateAbsencePersonnel,
  deleteAbsencePersonnel,
};
