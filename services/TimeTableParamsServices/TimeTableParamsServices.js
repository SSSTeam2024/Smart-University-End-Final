const timeTableParamsDao = require("../../dao/TimeTableParamsDao/TimeTableParamsDao");
const { getDb } = require("../../config/dbSwitcher");

const createTimeTableParams = async (params, useNew) => {
  try {
    const db = await getDb(useNew);
    return await timeTableParamsDao.createTimeTableParams(params, db);
  } catch (error) {
    console.error("Error when creating time table params", error);
    throw error;
  }
};

const updateTimeTableParams = async (updateData, useNew) => {
  const db = await getDb(useNew);
  return await timeTableParamsDao.updateTimeTableParams(updateData, db);
};

const getTimeTableParams = async (useNew) => {
  const db = await getDb(useNew);
  const result = await timeTableParamsDao.getTimeTableParams(db);
  return result;
};

module.exports = {
  getTimeTableParams,
  updateTimeTableParams,
  createTimeTableParams,
};
