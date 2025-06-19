const typeStageSchema = require("../../model/TypeStageModel/TypeStageModel");

function getTypeStageModel(dbConnection) {
  return (
    dbConnection.models.TypeStage ||
    dbConnection.model("TypeStage", typeStageSchema)
  );
}

const createTypeStage = async (typeStage, dbName) => {
  try {
    const TypeStage = await getTypeStageModel(dbName);
    const newTypeStage = new TypeStage(typeStage);
    return await newTypeStage.save();
  } catch (error) {
    console.error("Error While creating a new type stage in dao", error);
  }
};

const getTypeStages = async (dbName) => {
  try {
    const TypeStage = await getTypeStageModel(dbName);
    return await TypeStage.find().populate("niveau").populate("classes");
  } catch (error) {
    console.error("Error While fetching all types stage in dao", error);
  }
};

const updateTypeStage = async (id, updateData, dbName) => {
  try {
    const TypeStage = await getTypeStageModel(dbName);
    return await TypeStage.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error While updating type stage in dao", error);
  }
};

const deleteTypeStage = async (id, dbName) => {
  try {
    const TypeStage = await getTypeStageModel(dbName);
    return await TypeStage.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error While removing type stage in dao", error);
  }
};

const getTypeStageById = async (id, dbName) => {
  try {
    const TypeStage = await getTypeStageModel(dbName);
    return await TypeStage.findById(id).populate("classes");
  } catch (error) {
    console.error("Error fetching type stage by ID in dao:", error);
    throw error;
  }
};

module.exports = {
  createTypeStage,
  getTypeStages,
  updateTypeStage,
  deleteTypeStage,
  getTypeStageById,
};
