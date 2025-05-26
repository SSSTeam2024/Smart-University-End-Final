const MissionSchema = require("../../model/MissionModel/Mission");

function getMissionModel(dbConnection) {
  return (
    dbConnection.models.Mission || dbConnection.model("Mission", MissionSchema)
  );
}

const createMission = async (missionData, dbName) => {
  const Mission = await getMissionModel(dbName);
  const mission = new Mission(missionData);
  return mission.save();
};

const getAllMissions = async (dbName) => {
  const Mission = await getMissionModel(dbName);
  return Mission.find().populate("personnel").populate("enseignant");
};

const getMissionById = async (id, dbName) => {
  const Mission = await getMissionModel(dbName);
  return Mission.findById(id);
};

const updateMission = async (id, updateData, dbName) => {
  const Mission = await getMissionModel(dbName);
  return Mission.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMission = async (id, dbName) => {
  const Mission = await getMissionModel(dbName);
  return Mission.findByIdAndDelete(id);
};

const deleteManyMissions = async (dbName, ids) => {
  const missionModel = await getMissionModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await missionModel.deleteMany(query);
};

const getMissionsByPersonnelId = async (id, dbName) => {
  try {
    const missionModel = await getMissionModel(dbName);
    const missions = await missionModel.find({
      personnel: id,
    });
    return missions;
  } catch (error) {
    console.error("Error while getting missions by personnel id in Dao ");
    throw error;
  }
};

module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  updateMission,
  deleteMission,
  deleteManyMissions,
  getMissionsByPersonnelId,
};
