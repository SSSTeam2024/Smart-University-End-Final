const CourrierSortant = require("../../model/CourrierSortantModel/CourrierSortantModel");

const createCourrierSortant = async (courrierSortant) => {
  return await CourrierSortant.create(courrierSortant);
};

const getCourrierSortants = async () => {
  return await CourrierSortant.find()
    .populate("voie_envoi")
    .populate("destinataire");
};

const updateCourrierSortant = async (id, updateData) => {
  return await CourrierSortant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCourrierSortant = async (id) => {
  return await CourrierSortant.findByIdAndDelete(id);
};

module.exports = {
  createCourrierSortant,
  getCourrierSortants,
  updateCourrierSortant,
  deleteCourrierSortant,
};
