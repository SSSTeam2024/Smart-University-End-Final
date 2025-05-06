const VirtualServiceDao = require("../../dao/VirtualServiceDao/VirtualServiceDao");
const { getDb } = require("../../config/dbSwitcher");

const createVirtualService = async (VirtualServiceData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await VirtualServiceDao.createVirtualService(VirtualServiceData, db);
  } catch (error) {
    console.error("Error creating VirtualService:", error);
    throw error;
  }
};

const getAllVirtualServices = async (dbName) => {
  const db = await getDb(dbName);
  return await VirtualServiceDao.getAllVirtualServices(db);
};

const getVirtualServiceById = async (id, useNew) => {
  const db = await getDb(useNew);
  return VirtualServiceDao.getVirtualServiceById(id, db);
};

const updateVirtualService = async (id, updateData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await VirtualServiceDao.updateVirtualService(id, updateData, db);
  } catch (error) {
    console.error("Error updating VirtualService:", error);
    throw error;
  }
};

const deleteVirtualService = async (id, useNew) => {
  const db = await getDb(useNew);
  return VirtualServiceDao.deleteVirtualService(id, db);
};

module.exports = {
  createVirtualService,
  getAllVirtualServices,
  getVirtualServiceById,
  updateVirtualService,
  deleteVirtualService,
};
