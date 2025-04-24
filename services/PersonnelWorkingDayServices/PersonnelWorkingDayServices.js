const PersonnelWorkingDayDao = require("../../dao/PersonnelWorkingDayDao/PersonnelWorkingDayDao");

const createPersonnelWorkingDay = async (params) => {
  try {
    return await PersonnelWorkingDayDao.createPersonnelWorkingDay(params);
  } catch (error) {
    console.error("Error when creating Personnel Working Day", error);
    throw error;
  }
};

const updatePersonnelWorkingDay = async (id, updateData) => {
  return await PersonnelWorkingDayDao.updatePersonnelWorkingDay(id, updateData);
};

const getPersonnelWorkingDay = async () => {
  const result = await PersonnelWorkingDayDao.getPersonnelWorkingDay();
  return result;
};

const deletePersonnelWorkingDay = async (id) => {
  return PersonnelWorkingDayDao.deletePersonnelWorkingDay(id);
};

module.exports = {
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  createPersonnelWorkingDay,
  deletePersonnelWorkingDay,
};
