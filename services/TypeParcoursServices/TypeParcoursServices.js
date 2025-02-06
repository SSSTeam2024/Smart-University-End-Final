const typeParcoursao = require("../../dao/TypeParcoursDao/TypeParcoursDao");

const createTypeParcours = async (userData) => {
  try {
    const typeParcours = await typeParcoursao.createTypeParcours(userData);

    return typeParcours;
  } catch (error) {
    console.error("Error in creating type parcours:", error);
    throw error;
  }
};

const updateTypeParcours = async (id, updateData) => {
  return await typeParcoursao.updateTypeParcours(id, updateData);
};

const getTypeParcours = async () => {
  return await typeParcoursao.getTypesParcours();
};

const deleteTypeParcours = async (id) => {
  return await typeParcoursao.deleteTypeParcours(id);
};

const getTypeParcoursByValue = async ({
  name_type_parcours_ar,
  name_type_parcours_fr,
}) => {
  return await typeParcoursao.getTypeParcoursByValue(
    name_type_parcours_ar,
    name_type_parcours_fr
  );
};

module.exports = {
  deleteTypeParcours,
  getTypeParcours,
  updateTypeParcours,
  createTypeParcours,
  getTypeParcoursByValue,
};
