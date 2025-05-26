const StagePfeDao = require("../../dao/StagePfeDao/StagePfeDao");
const { getDb } = require("../../config/dbSwitcher");

const createStagePfe = async (stagePfe, useNew) => {
  try {
    const db = await getDb(useNew);
    return await StagePfeDao.createStagePfe(stagePfe, db);
  } catch (error) {
    console.error("Error creating stage pfe in services:", error);
  }
};

// const updateVoieEnvoi = async (id, updateData, useNew) => {
//   const db = await getDb(useNew);
//   return await StagePfeDao.updateVoieEnvoi(id, updateData, db);
// };

const getStagesPfe = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await StagePfeDao.getStagesPfe(db);
    return result;
  } catch (error) {
    nsole.error("Error fetchingg all stages pfe in services:", error);
  }
};

// const deleteVoieEnvoi = async (id, useNew) => {
//   const db = await getDb(useNew);
//   return await StagePfeDao.deleteVoieEnvoi(id, db);
// };

module.exports = {
  createStagePfe,
  //   updateVoieEnvoi,
  getStagesPfe,
  //   deleteVoieEnvoi,
};
