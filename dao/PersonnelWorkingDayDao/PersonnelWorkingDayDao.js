const PersonnelWorkingDay = require("../../model/PersonnelWorkingDayModel/PersonnelWorkingDayModel");

const createPersonnelWorkingDay = async (params) => {
  return await PersonnelWorkingDay.create(params);
};

const getPersonnelWorkingDay = async () => {
  return await PersonnelWorkingDay.find();
};

const updatePersonnelWorkingDay = async (id, updateData) => {
  return PersonnelWorkingDay.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePersonnelWorkingDay = async (id) => {
  return PersonnelWorkingDay.findByIdAndDelete(id);
};

module.exports = {
  createPersonnelWorkingDay,
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  deletePersonnelWorkingDay,
};
