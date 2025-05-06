const etatCompteEtudiantSchema = require("../../model/etatCompteEtudiantModel/EtatCompteEtudiantModel");

function getEtatCompteEtudiantModel(dbConnection) {
  return (
    dbConnection.models.EtatCompteEtudiant ||
    dbConnection.model("EtatCompteEtudiant", etatCompteEtudiantSchema)
  );
}

const createEtatEtudiant = async (etat_etudiant, dbName) => {
  const etatEtudiant = await getEtatCompteEtudiantModel(dbName);
  return await etatEtudiant.create(etat_etudiant);
};

const getEtatsEtudiant = async (dbName) => {
  const etatEtudiant = await getEtatCompteEtudiantModel(dbName);
  const result = await etatEtudiant.find();
  return result;
};

const updateEtatEtudiant = async (id, updateData, dbName) => {
  const etatEtudiant = await getEtatCompteEtudiantModel(dbName);
  return await etatEtudiant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEtatEtudiant = async (id, dbName) => {
  const etatEtudiant = await getEtatCompteEtudiantModel(dbName);
  return await etatEtudiant.findByIdAndDelete(id);
};

const getEtatEtudiantById = async (id, dbName) => {
  const etatEtudiant = await getEtatCompteEtudiantModel(dbName);
  return await etatEtudiant.findById(id);
};

const getEtatByValue = async (etat_ar, etat_fr, dbName) => {
  const etatEtudiant = await getEtatCompteEtudiantModel(dbName);
  return await etatEtudiant.findOne({ etat_ar, etat_fr });
};

module.exports = {
  createEtatEtudiant,
  getEtatsEtudiant,
  updateEtatEtudiant,
  deleteEtatEtudiant,
  getEtatEtudiantById,
  getEtatByValue,
};
