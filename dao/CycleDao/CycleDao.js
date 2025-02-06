const Cycle = require("../../model/CycleModel/CycleModel");

const createCycle = async (cycle) => {
  return await Cycle.create(cycle);
};

const getCycles = async () => {
  return await Cycle.find();
};

const updateCycle = async (id, updateData) => {
  return await Cycle.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCycle = async (id) => {
  return await Cycle.findByIdAndDelete(id);
};

const getCycleById = async (id) => {
  return await Cycle.findById(id);
};

const getCycleByValue = async (cycle_ar, cycle_fr) => {
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
