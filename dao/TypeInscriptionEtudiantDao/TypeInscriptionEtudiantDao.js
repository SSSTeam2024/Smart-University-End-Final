const typeInscriptionEtudiantSchema = require("../../model/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel");

function getTypeInscriptionEtudiantModel(dbConnection) {
  return (
    dbConnection.models.TypeInscriptionEtudiant ||
    dbConnection.model("TypeInscriptionEtudiant", typeInscriptionEtudiantSchema)
  );
}

const createTypeInscriptionEtudiant = async (type_inscrit, dbName) => {
  const typeInscriptionEtudiant = await getTypeInscriptionEtudiantModel(dbName);
  return await typeInscriptionEtudiant.create(type_inscrit);
};

const getTypeInscriptionsEtudiant = async (dbName) => {
  const typeInscriptionEtudiant = await getTypeInscriptionEtudiantModel(dbName);
  const result = await typeInscriptionEtudiant.find();
  return result;
};

const updateTypeInscriptionEtudiant = async (id, updateData, dbName) => {
  const typeInscriptionEtudiant = await getTypeInscriptionEtudiantModel(dbName);
  return await typeInscriptionEtudiant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteTypeInscriptionEtudiant = async (id, dbName) => {
  const typeInscriptionEtudiant = await getTypeInscriptionEtudiantModel(dbName);
  return await typeInscriptionEtudiant.findByIdAndDelete(id);
};

const getTypeInscriptionEtudiantById = async (id, dbName) => {
  const typeInscriptionEtudiant = await getTypeInscriptionEtudiantModel(dbName);
  return await typeInscriptionEtudiant.findById(id);
};

const getTypeInscriptionByValue = async (type_ar, type_fr, dbName) => {
  const typeInscriptionEtudiant = await getTypeInscriptionEtudiantModel(dbName);
  return await typeInscriptionEtudiant.findOne({ type_ar, type_fr });
};

module.exports = {
  getTypeInscriptionEtudiantById,
  deleteTypeInscriptionEtudiant,
  updateTypeInscriptionEtudiant,
  getTypeInscriptionsEtudiant,
  createTypeInscriptionEtudiant,
  getTypeInscriptionByValue,
};
