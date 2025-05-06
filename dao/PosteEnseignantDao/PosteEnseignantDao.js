const posteEnseignantSchema = require("../../model/PosteEnseignantModel/PosteEnseignantModel");

function getPosteEnseignantModel(dbConnection) {
  return (
    dbConnection.models.PosteEnseignant ||
    dbConnection.model("PosteEnseignant", posteEnseignantSchema)
  );
}

const createPosteEnseignant = async (poste_enseignant, dbName) => {
  const posteEnseignant = await getPosteEnseignantModel(dbName);
  return await posteEnseignant.create(poste_enseignant);
};

const getPostesEnseignant = async (dbName) => {
  const posteEnseignant = await getPosteEnseignantModel(dbName);
  return await posteEnseignant.find();
};

const updatePosteEnseignant = async (id, updateData, dbName) => {
  const posteEnseignant = await getPosteEnseignantModel(dbName);
  return await posteEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePosteEnseignant = async (id, dbName) => {
  const posteEnseignant = await getPosteEnseignantModel(dbName);
  return await posteEnseignant.findByIdAndDelete(id);
};

const getPosteEnseignantById = async (id, dbName) => {
  const posteEnseignant = await getPosteEnseignantModel(dbName);
  return await posteEnseignant.findById(id);
};

const getPosteByValue = async (poste_ar, poste_fr, dbName) => {
  const posteEnseignant = await getPosteEnseignantModel(dbName);
  return await posteEnseignant.findOne({ poste_ar, poste_fr });
};

module.exports = {
  createPosteEnseignant,
  getPostesEnseignant,
  updatePosteEnseignant,
  deletePosteEnseignant,
  getPosteEnseignantById,
  getPosteByValue,
};
