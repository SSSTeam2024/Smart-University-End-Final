const missionDao = require("../../dao/MissionDao/MissionDao");
const { getDb } = require("../../config/dbSwitcher");

const createMission = async (missionData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await missionDao.createMission(missionData, db);
  } catch (error) {
    console.error("Error creating Mission:", error);
    throw error;
  }
};

const getAllMissions = async (useNew) => {
  const db = await getDb(useNew);
  return missionDao.getAllMissions(db);
};

const getMissionById = async (id, useNew) => {
  const db = await getDb(useNew);
  return missionDao.getMissionById(id, db);
};

const deleteMission = async (id, useNew) => {
  const db = await getDb(useNew);
  return missionDao.deleteMission(id, db);
};

const deleteManyMissions = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await missionDao.deleteManyMissions(db, ids);
};

const getMissionsPersonnelId = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return missionDao.getMissionsByPersonnelId(id, db);
  } catch (error) {
    console.error(
      "Error while fetching missions by personnel id in services",
      error
    );
  }
};

module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  deleteMission,
  deleteManyMissions,
  getMissionsPersonnelId,
};
