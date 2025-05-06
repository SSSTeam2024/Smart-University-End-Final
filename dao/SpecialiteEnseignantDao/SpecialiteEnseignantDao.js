const specialiteEnseignantSchema = require("../../model/SpecialiteEnseignantModel/SpecialiteEnseignantModel");

function getSpecialiteEnseignantModel(dbConnection) {
  return (
    dbConnection.models.SpecialiteEnseignant ||
    dbConnection.model("SpecialiteEnseignant", specialiteEnseignantSchema)
  );
}

const createSpecialiteEnseignant = async (specialite_enseignant, dbName) => {
  const specialiteEnseignant = await getSpecialiteEnseignantModel(dbName);
  return await specialiteEnseignant.create(specialite_enseignant);
};

const getSpecialitesEnseignant = async (dbName) => {
  const specialiteEnseignant = await getSpecialiteEnseignantModel(dbName);
  const result = await specialiteEnseignant.find();
  return result;
};

const updateSpecialiteEnseignant = async (id, updateData, dbName) => {
  const specialiteEnseignant = await getSpecialiteEnseignantModel(dbName);
  return await specialiteEnseignant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteSpecialiteEnseignant = async (id, dbName) => {
  const specialiteEnseignant = await getSpecialiteEnseignantModel(dbName);
  return await specialiteEnseignant.findByIdAndDelete(id);
};

const getSpecialiteEnseignantById = async (id, dbName) => {
  const specialiteEnseignant = await getSpecialiteEnseignantModel(dbName);
  return await specialiteEnseignant.findById(id);
};

const getSpecialiteByValue = async (specialite_ar, specialite_fr, dbName) => {
  const specialiteEnseignant = await getSpecialiteEnseignantModel(dbName);
  return await specialiteEnseignant.findOne({ specialite_ar, specialite_fr });
};

module.exports = {
  createSpecialiteEnseignant,
  getSpecialitesEnseignant,
  deleteSpecialiteEnseignant,
  getSpecialiteEnseignantById,
  updateSpecialiteEnseignant,
  getSpecialiteByValue,
};
