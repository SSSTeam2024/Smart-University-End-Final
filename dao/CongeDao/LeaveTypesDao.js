const LeaveTypeSchema = require("../../model/CongéModels/TypeCongéModel");

function getLeaveTypeModel(dbConnection) {
  return (
    dbConnection.models.LeaveType ||
    dbConnection.model("LeaveType", LeaveTypeSchema)
  );
}

const createLeaveType = async (leaveTypeData, dbName) => {
  const LeaveType = await getLeaveTypeModel(dbName);
  const leaveType = new LeaveType(leaveTypeData);
  return leaveType.save();
};

const getAllLeaveType = async (dbName) => {
  const LeaveType = await getLeaveTypeModel(dbName);
  return LeaveType.find();
};

const getLeaveTypeById = async (id, dbName) => {
  const LeaveType = await getLeaveTypeModel(dbName);
  return LeaveType.findById(id);
};

const updateLeaveType = async (id, updateData, dbName) => {
  const LeaveType = await getLeaveTypeModel(dbName);
  return LeaveType.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteLeaveType = async (id, dbName) => {
  const LeaveType = await getLeaveTypeModel(dbName);
  return LeaveType.findByIdAndDelete(id);
};

async function findSubcategoryById(subcategoryId, dbName) {
  const LeaveType = await getLeaveTypeModel(dbName);
  const leaveType = await LeaveType.findOne(
    { "subcategories._id": subcategoryId },
    { "subcategories.$": 1 }
  );

  if (
    !leaveType ||
    !leaveType.subcategories ||
    leaveType.subcategories.length === 0
  ) {
    throw new Error("Subcategory not found");
  }

  return leaveType.subcategories[0];
}

module.exports = {
  createLeaveType,
  getAllLeaveType,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
  findSubcategoryById,
};
