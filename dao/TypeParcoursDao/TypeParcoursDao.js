const typeParcoursSchema = require("../../model/TypeParcoursModel/TypeParcoursModel");

function getTypeParcoursModel(dbConnection) {
  return (
    dbConnection.models.TypeParcours ||
    dbConnection.model("TypeParcours", typeParcoursSchema)
  );
}

const createTypeParcours = async (userData, dbName) => {
  try {
    const typeParcours = await getTypeParcoursModel(dbName);
    return await typeParcours.create(userData);
  } catch (error) {
    throw error;
  }
};

const getTypesParcours = async (dbName) => {
  try {
    const typeParcours = await getTypeParcoursModel(dbName);
    return await typeParcours.find();
  } catch (error) {
    console.error("Error fetching type parcours :", error);
    throw error;
  }
};
const updateTypeParcours = async (id, updateData, dbName) => {
  try {
    const typeParcours = await getTypeParcoursModel(dbName);
    return await typeParcours.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating parcours classe:", error);
    throw error;
  }
};

const deleteTypeParcours = async (id, dbName) => {
  const typeParcours = await getTypeParcoursModel(dbName);
  return await typeParcours.findByIdAndDelete(id);
};

const getTypeParcoursByValue = async (
  name_type_parcours_ar,
  name_type_parcours_fr,
  dbName
) => {
  const typeParcours = await getTypeParcoursModel(dbName);
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
