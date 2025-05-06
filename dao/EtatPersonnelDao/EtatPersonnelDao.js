const etatPersonnelSchema = require("../../model/etatPersonnelModel/EtatPersonnel");

function getEtatPersonnelModel(dbConnection) {
  return (
    dbConnection.models.EtatPersonnel ||
    dbConnection.model("EtatPersonnel", etatPersonnelSchema)
  );
}

const createEtatPersonnel = async (etat_personnel, dbName) => {
  const etatPersonnel = await getEtatPersonnelModel(dbName);
  return await etatPersonnel.create(etat_personnel);
};

const getEtatsPersonnel = async (dbName) => {
  const etatPersonnel = await getEtatPersonnelModel(dbName);
  return await etatPersonnel.find();
};

const updateEtatPersonnel = async (id, updateData, dbName) => {
  const etatPersonnel = await getEtatPersonnelModel(dbName);
  return await etatPersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEtatPersonnel = async (id, dbName) => {
  const etatPersonnel = await getEtatPersonnelModel(dbName);
  return await etatPersonnel.findByIdAndDelete(id);
};

const getEtatPersonnelById = async (id, dbName) => {
  const etatPersonnel = await getEtatPersonnelModel(dbName);
  return await etatPersonnel.findById(id);
};

const getEtatByValue = async (etat_ar, etat_fr, dbName) => {
  const etatPersonnel = await getEtatPersonnelModel(dbName);
  return await etatPersonnel.findOne({ etat_ar, etat_fr });
};

module.exports = {
  createEtatPersonnel,
  getEtatsPersonnel,
  updateEtatPersonnel,
  deleteEtatPersonnel,
  getEtatPersonnelById,
  getEtatByValue,
};
