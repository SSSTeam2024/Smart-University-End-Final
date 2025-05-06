const etatCompteEnseignantSchema = require("../../model/etatCompteEnseignantModel/etatCompteEnseignantModel");

function getEtatCompteEnseignantModel(dbConnection) {
  return (
    dbConnection.models.EtatCompteEnseignant ||
    dbConnection.model("EtatCompteEnseignant", etatCompteEnseignantSchema)
  );
}

const createEtatEnseignant = async (etat_enseignant, dbName) => {
  const etatEnseignant = await getEtatCompteEnseignantModel(dbName);
  return await etatEnseignant.create(etat_enseignant);
};

const getEtatsEnseignant = async (dbName) => {
  const etatEnseignant = await getEtatCompteEnseignantModel(dbName);
  const result = await etatEnseignant.find();
  return result;
};

const updateEtatEnseignant = async (id, updateData, dbName) => {
  const etatEnseignant = await getEtatCompteEnseignantModel(dbName);
  return await etatEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEtatEnseignant = async (id, dbName) => {
  const etatEnseignant = await getEtatCompteEnseignantModel(dbName);
  return await etatEnseignant.findByIdAndDelete(id);
};

const getEtatEnseignantById = async (id, dbName) => {
  const etatEnseignant = await getEtatCompteEnseignantModel(dbName);
  return await etatEnseignant.findById(id);
};

const getEtatByValue = async (etat_ar, etat_fr, dbName) => {
  const etatEnseignant = await getEtatCompteEnseignantModel(dbName);
  return await etatEnseignant.findOne({ etat_ar, etat_fr });
};

module.exports = {
  createEtatEnseignant,
  getEtatsEnseignant,
  updateEtatEnseignant,
  deleteEtatEnseignant,
  getEtatEnseignantById,
  getEtatByValue,
};
