const diversDocExtraDao = require("../../dao/DiversDocExtraDao/DiversDocExtraDao");
const { getDb } = require("../../config/dbSwitcher");


const createDiversDocExtra = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);

    const newDiversDocExtra = await diversDocExtraDao.createDiversDocExtra(
      userData,
      db
    );
    return newDiversDocExtra;

  } catch (error) {
    console.error(error);
    throw error;
  }
};


const updateDiversDocExtra = async (id, updateData, useNew) => {
  try {
    const db = await getDb(useNew);

    const updatedDiversDocExtra = await diversDocExtraDao.updateDiversDocExtra(
      id,
      updateData,
      db
    );
    return updatedDiversDocExtra;


  } catch (error) {
    console.error("Error updating DiversDocExtra:", error);
    throw error;
  }
};

const getDiversDocExtraById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await diversDocExtraDao.getDiversDocExtraById(id, db);
  } catch (error) {
    console.error("Error fetching DiversDocExtra by ID:", error);
    throw error;
  }
};

const getAllDiversDocExtra = async (useNew) => {
  try {
    const db = await getDb(useNew);
    return await diversDocExtraDao.getAllDiversDocExtra(db);
  } catch (error) {
    console.error("Error fetching diversDocExtra:", error);
    throw error;
  }
};

const deleteDiversDocExtra = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const deletedDiversDocExtra = await diversDocExtraDao.deleteDiversDocExtra(id, db);
    if (!deletedDiversDocExtra) {
      throw new Error("DiversDocExtra not found");
    }
    return deletedDiversDocExtra;
  } catch (error) {
    console.error(
      "Error deleting DiversDocExtra",
      error
    );
    throw error;
  }
};

const getDiversDocExtraByModelId = async (model_id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await diversDocExtraDao.getDiversDocExtraByModelId(model_id, db);
  } catch (error) {
    console.error("Error fetching DiversDocExtra by ID:", error);
    throw error;
  }
};

module.exports = {
  deleteDiversDocExtra,
  getAllDiversDocExtra,
  updateDiversDocExtra,
  getDiversDocExtraById,
  createDiversDocExtra,
  getDiversDocExtraByModelId
};
