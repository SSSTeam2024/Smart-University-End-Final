const leaveTypeDao = require("../../dao/CongeDao/LeaveTypesDao");
const { getDb } = require("../../config/dbSwitcher");

const createLeaveType = async (LeaveTypeData, useNew) => {
  const db = await getDb(useNew);
  return leaveTypeDao.createLeaveType(LeaveTypeData, db);
};

const getAllLeaveType = async (useNew) => {
  const db = await getDb(useNew);
  return leaveTypeDao.getAllLeaveType(db);
};

const getLeaveTypeById = async (id, useNew) => {
  const db = await getDb(useNew);
  return leaveTypeDao.getLeaveTypeById(id, db);
};

const updateLeaveType = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return leaveTypeDao.updateLeaveType(id, updateData, db);
};

const deleteLeaveType = async (id, useNew) => {
  const db = await getDb(useNew);
  return leaveTypeDao.deleteLeaveType(id, db);
};

const getSubcategoryById = async (subcategoryId, useNew) => {
  try {
    const db = await getDb(useNew);
    return leaveTypeDao.findSubcategoryById(subcategoryId, db);
  } catch (error) {
    throw new Error(`Service error: ${error.message}`);
  }
};

module.exports = {
  createLeaveType,
  getAllLeaveType,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
  getSubcategoryById,
};
