const CourrierEntrant = require("../../model/CourrierEntrantModel/CourrierEntrantModel");

const createCourrierEntrant = async (courrierEntrant) => {
  return await CourrierEntrant.create(courrierEntrant);
};

const getCourrierEntrants = async () => {
  return await CourrierEntrant.find()
    .populate("source")
    .populate("destinataire");
};

const getLastCourrierEntrant = async () => {
  return await CourrierEntrant.findOne().sort({ createdAt: -1 });
};

const updateCourrierEntrant = async (id, updateData) => {
  return await CourrierEntrant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCourrierEntrant = async (id) => {
  return await CourrierEntrant.findByIdAndDelete(id);
};

module.exports = {
  createCourrierEntrant,
  getCourrierEntrants,
  updateCourrierEntrant,
  deleteCourrierEntrant,
  getLastCourrierEntrant,
};
