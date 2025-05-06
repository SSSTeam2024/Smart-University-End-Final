const cycleSchema = require("../../model/CycleModel/CycleModel");

function getCycleModel(dbConnection) {
  return dbConnection.models.Cycle || dbConnection.model("Cycle", cycleSchema);
}

const createCycle = async (cycle, dbName) => {
  const Cycle = await getCycleModel(dbName);
  return await Cycle.create(cycle);
};

const getCycles = async (dbName) => {
  const Cycle = await getCycleModel(dbName);
  return await Cycle.find();
};

const updateCycle = async (id, updateData, dbName) => {
  const Cycle = await getCycleModel(dbName);
  return await Cycle.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCycle = async (id, dbName) => {
  const Cycle = await getCycleModel(dbName);
  return await Cycle.findByIdAndDelete(id);
};

const getCycleById = async (id, dbName) => {
  const Cycle = await getCycleModel(dbName);
  return await Cycle.findById(id);
};

const getCycleByValue = async (cycle_ar, cycle_fr, dbName) => {
  const Cycle = await getCycleModel(dbName);
  return await Cycle.findOne({ cycle_ar, cycle_fr });
};

module.exports = {
  createCycle,
  getCycles,
  updateCycle,
  deleteCycle,
  getCycleById,
  getCycleByValue,
};
