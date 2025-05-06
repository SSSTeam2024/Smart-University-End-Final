const typeParcoursao = require("../../dao/TypeParcoursDao/TypeParcoursDao");
const { getDb } = require("../../config/dbSwitcher");

const createTypeParcours = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const typeParcours = await typeParcoursao.createTypeParcours(userData, db);

    return typeParcours;
  } catch (error) {
    console.error("Error in creating type parcours:", error);
    throw error;
  }
};

const updateTypeParcours = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await typeParcoursao.updateTypeParcours(id, updateData, db);
};

const getTypeParcours = async (useNew) => {
  const db = await getDb(useNew);
  return await typeParcoursao.getTypesParcours(db);
};

const deleteTypeParcours = async (id, useNew) => {
  const db = await getDb(useNew);
  return await typeParcoursao.deleteTypeParcours(id, db);
};

const getTypeParcoursByValue = async ({
  name_type_parcours_ar,
  name_type_parcours_fr,
  useNew,
}) => {
  const db = await getDb(useNew);
  return await typeParcoursao.getTypeParcoursByValue(
    name_type_parcours_ar,
    name_type_parcours_fr,
    db
  );
};

module.exports = {
  deleteTypeParcours,
  getTypeParcours,
  updateTypeParcours,
  createTypeParcours,
  getTypeParcoursByValue,
};
