const RattrapageSchema = require("../../model/RattrapageModel/RattrapageModel");

function getRattrapageModel(dbConnection) {
  return (
    dbConnection.models.Rattrapage ||
    dbConnection.model("Rattrapage", RattrapageSchema)
  );
}

const createRattrapage = async (data, dbName) => {
  try {
    const RattrapageModel = await getRattrapageModel(dbName);
    return await RattrapageModel.create(data);
  } catch (error) {
    console.error("Error creating catch-up session:", error);
    throw error;
  }
};

const getRattrapages = async (dbName) => {
  const RattrapageModel = await getRattrapageModel(dbName);
  const result = await RattrapageModel.find()
    .populate("salle")
    .populate("classe")
    .populate("enseignant")
    .populate("matiere");
  return result;
};

const updateEtatAndStatusRattrapage = async (
  rattrapageId,
  etat,
  status,
  dbName
) => {
  try {
    const RattrapageModel = await getRattrapageModel(dbName);
    const updatedRattrapage = await RattrapageModel.findByIdAndUpdate(
      rattrapageId,
      { etat, status },
      { new: true }
    );
    if (!updatedRattrapage) {
      throw new Error(`Rattrapage with ID ${rattrapageId} not found.`);
    }
    return updatedRattrapage;
  } catch (error) {
    throw new Error(`Failed to update Rattrapage: ${error.message}`);
  }
};

const getRattrapagesByClassId = async (classId, dbName) => {
  try {
    const RattrapageModel = await getRattrapageModel(dbName);
    return await RattrapageModel.find({ classe: classId })
      .populate("matiere")
      .populate("enseignant")
      .populate("salle")
      .populate("classe");
  } catch (error) {
    console.error("Error fetching rattrapages by class ID:", error);
    throw error;
  }
};

const getRattrapagesByTeacherId = async (teacherId, dbName) => {
  try {
    const RattrapageModel = await getRattrapageModel(dbName);
    return await RattrapageModel.find({ enseignant: teacherId })
      .populate("matiere")
      .populate("enseignant")
      .populate("salle")
      .populate("classe");
  } catch (error) {
    console.error("Error fetching rattrapages by teacher ID:", error);
    throw error;
  }
};

const deleteManyRattrapages = async (dbName, ids) => {
  const rattrapagesModel = await getRattrapageModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await rattrapagesModel.deleteMany(query);
};

module.exports = {
  createRattrapage,
  getRattrapages,
  updateEtatAndStatusRattrapage,
  getRattrapagesByClassId,
  getRattrapagesByTeacherId,
  deleteManyRattrapages,
};
