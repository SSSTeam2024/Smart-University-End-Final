const commissionSchema = require("../../model/CommissionModel/CommissionModel");

function getCommissionModel(dbConnection) {
  return (
    dbConnection.models.Commission ||
    dbConnection.model("Commission", commissionSchema)
  );
}

const createCommission = async (commission, dbName) => {
  try {
    const Commission = await getCommissionModel(dbName);
    return await Commission.create(commission);
  } catch (error) {
    console.error("create new commission in dao: ", error);
  }
};

const getCommissions = async (dbName) => {
  try {
    const Commission = await getCommissionModel(dbName);
    return await Commission.find().populate("membres").populate("groupes");
  } catch (error) {
    console.error("getting commissions in dao: ", error);
  }
};

const updateCommission = async (id, updateData, dbName) => {
  try {
    const Commission = await getCommissionModel(dbName);
    return await Commission.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("update commission in dao: ", error);
  }
};

const deleteCommission = async (id, dbName) => {
  try {
    const Commission = await getCommissionModel(dbName);
    return await Commission.findByIdAndDelete(id);
  } catch (error) {
    console.error("delete commission in dao: ", error);
  }
};

module.exports = {
  createCommission,
  getCommissions,
  updateCommission,
  deleteCommission,
};
