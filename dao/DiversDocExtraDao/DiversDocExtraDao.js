const diversDocExtraSchema = require("../../model/DiversDocExtraModel/DiversDocExtraModel");

function getDiversDocExtraModel(dbConnection) {
  return (
    dbConnection.models.DiversDocExtra ||
    dbConnection.model("DiversDocExtra", diversDocExtraSchema)
  );
}

const createDiversDocExtra = async (data, dbName) => {
  try {
    const diversDocExtraModel = await getDiversDocExtraModel(dbName);
    return await diversDocExtraModel.create(data);
  } catch (error) {
    console.error("Error creating DiversDocExtra:", error);
    throw error;
  }
};
const getAllDiversDocExtra = async (dbName) => {
  try {
    const diversDocExtraModel = await getDiversDocExtraModel(dbName);
    return await diversDocExtraModel
      .find()
      .populate("model_id")
  } catch (error) {
    console.error("Error fetching all DiversDocExtra:", error);
    throw error;
  }
};

const updateDiversDocExtra = async (id, updateData, dbName) => {
  try {
    const diversDocExtraModel = await getDiversDocExtraModel(dbName);
    return await diversDocExtraModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("model_id");
  } catch (error) {
    console.error("Error updating divers docs extra:", error);
    throw error;
  }
};

const deleteDiversDocExtra = async (id, dbName) => {
  try {
    const diversDocExtraModel = await diversDocExtraModel(dbName);
    return await diversDocExtraModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting DiversDocExtra:", error);
    throw error;
  }
};

const getDiversDocExtraById = async (id, dbName) => {
  try {
    const diversDocExtraModel = await getDiversDocExtraModel(dbName);
    return await diversDocExtraModel
      .findById(id)
      .populate("model_id")

  } catch (error) {
    console.error("Error fetching DiversDocExtra by ID:", error);
    throw error;
  }
};

const getDiversDocExtraByModelId = async (model_id, dbName) => {
  try {
    const diversDocExtraModel = await getDiversDocExtraModel(dbName);
    return await diversDocExtraModel
      .find({ model_id: model_id })
      .populate("model_id")

  } catch (error) {
    console.error("Error fetching DiversDocExtra by ID:", error);
    throw error;
  }
};

module.exports = {
  getDiversDocExtraById,
  deleteDiversDocExtra,
  updateDiversDocExtra,
  getAllDiversDocExtra,
  createDiversDocExtra,
  getDiversDocExtraByModelId
};
