const avisCommissionSchema = require("../../model/AvisCommission/AvisCommission");

function getAvisCommissionModel(dbConnection) {
  return (
    dbConnection.models.AvisCommission ||
    dbConnection.model("AvisCommission", avisCommissionSchema)
  );
}

const createAvisCommission = async (avisCommission, dbName) => {
  try {
    const AvisCommission = await getAvisCommissionModel(dbName);
    const createdAvisComm = await AvisCommission.create(avisCommission);
    const populatedAvisComm = await AvisCommission.findById(createdAvisComm._id)
      .populate({
        path: "commission",
        populate: { path: "membres" },
      })
      .populate("type_stage");

    return populatedAvisComm;
  } catch (error) {
    console.error("create new Avis Commission in dao: ", error);
  }
};

const getAvisCommissions = async (dbName) => {
  try {
    const AvisCommission = await getAvisCommissionModel(dbName);
    return await AvisCommission.find()
      .populate({
        path: "commission",
        populate: { path: "membres" },
      })
      .populate("type_stage");
  } catch (error) {
    console.error("getting Avis Commissions in dao: ", error);
  }
};

const updateAvisCommission = async (id, updateData, dbName) => {
  try {
    const AvisCommission = await getAvisCommissionModel(dbName);
    return await AvisCommission.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error("update Avis Commission in dao: ", error);
  }
};

const deleteAvisCommission = async (id, dbName) => {
  try {
    const AvisCommission = await getAvisCommissionModel(dbName);
    return await AvisCommission.findByIdAndDelete(id);
  } catch (error) {
    console.error("delete Avis Commission in dao: ", error);
  }
};

module.exports = {
  createAvisCommission,
  getAvisCommissions,
  updateAvisCommission,
  deleteAvisCommission,
};
