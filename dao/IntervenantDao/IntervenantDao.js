const Intervenant = require("../../model/IntervenantBureauOrdre/IntervenantBureauOrdre");

const createIntervenant = async (intervenant) => {
  return await Intervenant.create(intervenant);
};

const getIntervenants = async () => {
  return await Intervenant.find();
};

const updateIntervenant = async (id, updateData) => {
  return await Intervenant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteIntervenant = async (id) => {
  return await Intervenant.findByIdAndDelete(id);
};

module.exports = {
  createIntervenant,
  getIntervenants,
  updateIntervenant,
  deleteIntervenant,
};
