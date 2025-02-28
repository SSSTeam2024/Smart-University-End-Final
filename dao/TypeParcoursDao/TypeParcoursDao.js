const typeParcours = require("../../model/TypeParcoursModel/TypeParcoursModel");

const createTypeParcours = async (userData) => {
  try {
    return await typeParcours.create(userData);
  } catch (error) {
    throw error;
  }
};

const getTypesParcours = async () => {
  try {
    return await typeParcours.find();
  } catch (error) {
    console.error("Error fetching type parcours :", error);
    throw error;
  }
};
const updateTypeParcours = async (id, updateData) => {
  try {
    return await typeParcours.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating parcours classe:", error);
    throw error;
  }
};

const deleteTypeParcours = async (id) => {
  return await typeParcours.findByIdAndDelete(id);
};

const getTypeParcoursByValue = async (
  name_type_parcours_ar,
  name_type_parcours_fr
) => {
  return await typeParcours.findOne({
    name_type_parcours_ar,
    name_type_parcours_fr,
  });
};

module.exports = {
  deleteTypeParcours,
  updateTypeParcours,
  createTypeParcours,
  getTypesParcours,
  getTypeParcoursByValue,
};
