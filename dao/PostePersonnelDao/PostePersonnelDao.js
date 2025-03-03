const postePersonnel = require("../../model/PostePersonnelModel/PostePersonnelModel");

const createPostePersonnel = async (poste_personnel) => {
  return await postePersonnel.create(poste_personnel);
};

const getPostesPersonnel = async () => {
  return await postePersonnel.find();
};

const updatePostePersonnel = async (id, updateData) => {
  return await postePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePostePersonnel = async (id) => {
  return await postePersonnel.findByIdAndDelete(id);
};

const getPostePersonnelById = async (id) => {
  return await postePersonnel.findById(id);
};

const getPosteByValue = async (poste_ar, poste_fr) => {
  return await postePersonnel.findOne({ poste_ar, poste_fr });
};

module.exports = {
  createPostePersonnel,
  getPostesPersonnel,
  updatePostePersonnel,
  deletePostePersonnel,
  getPostePersonnelById,
  getPosteByValue,
};
