const absencePersonnelDao = require('../../dao/AbsencePersonnelDao/AbsencePersonnelDao');


const createAbsencePersonnel = async (absencePersonnelData) => {

    return await absencePersonnelDao.createAbsencePersonnel(absencePersonnelData);
};
const getAllAbsencesPersonnels = async () => {
  return absencePersonnelDao.getAllAbsencesPersonnels();
};

const getAbsencePersonnelById = async (id) => {
  return absencePersonnelDao.getAbsencePersonnelById(id);
};

const updateAbsencePersonnel = async (id, updateData) => {
 
    return await absencePersonnelDao.updateAbsencePersonnel(id, updateData);
};

const deleteAbsencePersonnel = async (id) => {
  return absencePersonnelDao.deleteAbsencePersonnel(id);
};

module.exports = {
  createAbsencePersonnel,
  getAllAbsencesPersonnels,
  getAbsencePersonnelById,
  updateAbsencePersonnel,
  deleteAbsencePersonnel
};