const PersonnelWorkingDayDao = require("../../dao/PersonnelWorkingDayDao/PersonnelWorkingDayDao");
const { getDb } = require("../../config/dbSwitcher");

const createPersonnelWorkingDay = async (params, useNew) => {
  try {
    const db = await getDb(useNew);
    return await PersonnelWorkingDayDao.createPersonnelWorkingDay(params, db);
  } catch (error) {
    console.error("Error when creating Personnel Working Day", error);
    throw error;
  }
};

const updatePersonnelWorkingDay = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await PersonnelWorkingDayDao.updatePersonnelWorkingDay(
    id,
    updateData,
    db
  );
};

const getPersonnelWorkingDay = async (useNew) => {
  const db = await getDb(useNew);
  const result = await PersonnelWorkingDayDao.getPersonnelWorkingDay(db);
  return result;
};

const deletePersonnelWorkingDay = async (id, useNew) => {
  const db = await getDb(useNew);
  return PersonnelWorkingDayDao.deletePersonnelWorkingDay(id, db);
};

module.exports = {
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  createPersonnelWorkingDay,
  deletePersonnelWorkingDay,
};
