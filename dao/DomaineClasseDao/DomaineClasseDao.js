const DomaineClasseSchema = require("../../model/DomaineClasseModel/DomaineClasseModel");

function getDomaineClasseModel(dbConnection) {
  return (
    dbConnection.models.DomaineClasse ||
    dbConnection.model("DomaineClasse", DomaineClasseSchema)
  );
}

const createDomaineClasse = async (domaine, dbName) => {
  try {
    const DomaineClasse = await getDomaineClasseModel(dbName);
    return await DomaineClasse.create(domaine);
  } catch (error) {
    throw error;
  }
};

const getDomainesClasse = async (dbName) => {
  try {
    const DomaineClasse = await getDomaineClasseModel(dbName);
    return await DomaineClasse.find();
  } catch (error) {
    console.error("Error fetching domaine classe:", error);
    throw error;
  }
};
const updateDomaineClasse = async (id, updateData, dbName) => {
  try {
    const DomaineClasse = await getDomaineClasseModel(dbName);
    return await DomaineClasse.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating domaine classe:", error);
    throw error;
  }
};

const deleteDomaineClasse = async (id, dbName) => {
  const DomaineClasse = await getDomaineClasseModel(dbName);
  return await DomaineClasse.findByIdAndDelete(id);
};

const getDomaineByValue = async (name_domaine_ar, name_domaine_fr, dbName) => {
  const DomaineClasse = await getDomaineClasseModel(dbName);
  return await DomaineClasse.findOne({ name_domaine_ar, name_domaine_fr });
};

module.exports = {
  deleteDomaineClasse,
  updateDomaineClasse,
  getDomainesClasse,
  createDomaineClasse,
  getDomaineByValue,
};
