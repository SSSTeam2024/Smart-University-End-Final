const typeStageDao = require("../../dao/TypeStageDao/TypeStageDao");
const { getDb } = require("../../config/dbSwitcher");

const createTypeStage = async (TypeStage, useNew) => {
  try {
    const db = await getDb(useNew);
    return await typeStageDao.createTypeStage(TypeStage, db);
  } catch (error) {
    console.error("Error While creating a new type stage in services", error);
  }
};

const updateTypeStage = async (id, updateData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await typeStageDao.updateTypeStage(id, updateData, db);
  } catch (error) {
    console.error("Error While updating type stage in services", error);
  }
};

const getAllTypeStage = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await typeStageDao.getTypeStages(db);
    return result;
  } catch (error) {
    console.error("Error While fetching all types stage in services", error);
  }
};

const deleteTypeStage = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await typeStageDao.deleteTypeStage(id, db);
  } catch (error) {
    console.error("Error While removing type stage in services", error);
  }
};

const getTypeStageById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await typeStageDao.getTypeStageById(id, db);
    return result;
  } catch (error) {
    console.error("Error fetching type stage by id in services", error.message);
  }
};

module.exports = {
  createTypeStage,
  updateTypeStage,
  getAllTypeStage,
  deleteTypeStage,
  getTypeStageById,
};
