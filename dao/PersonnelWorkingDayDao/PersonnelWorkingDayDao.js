const PersonnelWorkingDay = require("../../model/PersonnelWorkingDayModel/PersonnelWorkingDayModel");

const createPersonnelWorkingDay = async (params) => {
  return await PersonnelWorkingDay.create(params);
};

const getPersonnelWorkingDay = async () => {
  return await PersonnelWorkingDay.find();
};

const updatePersonnelWorkingDay = async (updateData) => {
  let params = await PersonnelWorkingDay.find();
  return await PersonnelWorkingDay.findByIdAndUpdate(
    params[0]._id,
    updateData,
    { new: true }
  );
};

module.exports = {
  createPersonnelWorkingDay,
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
};
