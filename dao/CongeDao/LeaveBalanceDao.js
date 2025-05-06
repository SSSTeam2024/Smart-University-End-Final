const LeaveBalanceSchema = require("../../model/CongéModels/SoldeCongéModel");
const LeaveTypeSchema = require("../../model/CongéModels/TypeCongéModel");

function getLeaveTypeModel(dbConnection) {
  return (
    dbConnection.models.LeaveType ||
    dbConnection.model("LeaveType", LeaveTypeSchema)
  );
}

function getLeaveBalanceModel(dbConnection) {
  return (
    dbConnection.models.LeaveBalance ||
    dbConnection.model("LeaveBalance", LeaveBalanceSchema)
  );
}

const createLeaveBalance = async (LeaveBalanceData, dbName) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  const leaveBalance = new LeaveBalance(LeaveBalanceData);
  return leaveBalance.save();
};

const createOrUpdateLeaveBalance = async (leaveBalanceData, dbName) => {
  const { personnelId, leaveType, subcategory, year, requestedDays } =
    leaveBalanceData;

  try {
    const LeaveBalance = await getLeaveBalanceModel(dbName);
    const LeaveType = await getLeaveTypeModel(dbName);

    const filter = {
      personnelId,
      leaveType,
      year,
      ...(subcategory && { subcategory }),
    };

    const existingBalance = await LeaveBalance.findOne(filter);

    if (existingBalance) {
      if (existingBalance.remainingDays < requestedDays) {
        throw new Error("Insufficient leave balance for this request.");
      }

      existingBalance.daysUsed += requestedDays;
      existingBalance.remainingDays -= requestedDays;
      existingBalance.lastUpdated = new Date();

      return existingBalance.save();
    } else {
      let maxDays;

      if (subcategory) {
        const subcategoryRecord = await LeaveType.findOne(
          { _id: leaveType, "subcategories._id": subcategory },
          { "subcategories.$": 1 }
        );

        if (
          !subcategoryRecord ||
          !subcategoryRecord.subcategories[0]?.maxDays
        ) {
          throw new Error(
            "Leave subcategory not found or maxDays is not defined in subcategory"
          );
        }

        maxDays = subcategoryRecord.subcategories[0].maxDays;
      } else {
        const leaveTypeRecord = await LeaveType.findById(leaveType).select(
          "maxDays"
        );
        if (!leaveTypeRecord || typeof leaveTypeRecord.maxDays !== "number") {
          throw new Error(
            "Leave type not found or maxDays is not defined in the leave type"
          );
        }

        maxDays = leaveTypeRecord.maxDays;
      }

      if (typeof requestedDays !== "number") {
        throw new Error("Requested days must be a valid number");
      }

      const remainingDays = maxDays - requestedDays;

      if (remainingDays < 0) {
        throw new Error("Requested days exceed maximum allowed leave days.");
      }

      const newBalance = new LeaveBalance({
        personnelId,
        leaveType,
        subcategory,
        year,
        daysUsed: requestedDays,
        remainingDays,
        lastUpdated: new Date(),
      });
      return newBalance.save();
    }
  } catch (error) {
    console.error("Error in createOrUpdateLeaveBalance DAO:", error);
    throw error;
  }
};

const getAllLeaveBalance = async (dbName) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  return LeaveBalance.find().populate("personnelId").populate("leaveType");
};

const getLeaveBalanceById = async (id, dbName) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  return LeaveBalance.findById(id)
    .populate("personnelId")
    .populate("leaveType");
};

const updateLeaveBalance = async (id, updateData, dbName) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  updateData.updatedAt = Date.now();

  return LeaveBalance.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("personnelId")
    .exec();
};

const deleteLeaveBalance = async (id, dbName) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  return LeaveBalance.findByIdAndDelete(id);
};

const findLeaveBalance = async (
  personnelId,
  leaveType,
  subcategory,
  year,
  dbName
) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  return LeaveBalance.findOne({
    personnelId,
    leaveType,
    subcategory,
    year,
    dbName,
  });
};

const findLeaveBalances = async (
  personnelId,
  leaveType,
  subcategory,
  dbName
) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  const result = await LeaveBalance.aggregate([
    {
      $match: {
        personnelId,
        leaveType,
        "subcategory._id": subcategory,
        remainingDays: { $ne: 0 },
      },
    },
    {
      $sort: { year: 1 },
    },
  ]);
  console.log("leave balances from dao", result);
  return result;
};

const editLeaveBalance = async (id, updateData, dbName) => {
  const LeaveBalance = await getLeaveBalanceModel(dbName);
  return LeaveBalance.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  createLeaveBalance,
  createOrUpdateLeaveBalance,
  getAllLeaveBalance,
  getLeaveBalanceById,
  updateLeaveBalance,
  deleteLeaveBalance,
  findLeaveBalance,
  editLeaveBalance,
  findLeaveBalances,
};
