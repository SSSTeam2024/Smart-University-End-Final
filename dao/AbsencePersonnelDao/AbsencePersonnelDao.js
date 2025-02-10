const AbsencePersonnel = require('../../model/AbsencePersonnelModel/AbsencePersonnelModel');

const createAbsencePersonnel = async (absencePersonnelData) => {
  const absencePersonnel = new AbsencePersonnel(absencePersonnelData);
  return absencePersonnel.save();
};

const getAllAbsencesPersonnels = async () => {
  return AbsencePersonnel.find().populate('personnel');
};

const getAbsencePersonnelById = async (id) => {
  return AbsencePersonnel.findById(id);
};

const updateAbsencePersonnel = async (id, updateData) => {
  return AbsencePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAbsencePersonnel = async (id) => {
  return AbsencePersonnel.findByIdAndDelete(id);
};

module.exports = {
  createAbsencePersonnel,
  getAllAbsencesPersonnels,
  getAbsencePersonnelById,
  updateAbsencePersonnel,
  deleteAbsencePersonnel
};