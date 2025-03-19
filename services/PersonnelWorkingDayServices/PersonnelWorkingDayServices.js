const PersonnelWorkingDayDao = require("../../dao/PersonnelWorkingDayDao/PersonnelWorkingDayDao");

const createPersonnelWorkingDay = async (params) => {
  try {
    return await PersonnelWorkingDayDao.createPersonnelWorkingDay(params);
  } catch (error) {
    console.error("Error when creating Personnel Working Day", error);
    throw error;
  }
};

const updatePersonnelWorkingDay = async (updateData) => {
  return await PersonnelWorkingDayDao.updatePersonnelWorkingDay(updateData);
};

const getPersonnelWorkingDay = async () => {
  const result = await PersonnelWorkingDayDao.getPersonnelWorkingDay();
  return result;
};

module.exports = {
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  createPersonnelWorkingDay,
};
