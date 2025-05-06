const pointageEnseignantSchema = require("../../model/PointageEnseignantModel/PointageEnseignantModel");

function getPointageEnseignantModel(dbConnection) {
  return (
    dbConnection.models.PointageEnseignant ||
    dbConnection.model("PointageEnseignant", pointageEnseignantSchema)
  );
}

const createPointageEnseignant = async (pointageEnseignant, dbName) => {
  const PointageEnseignant = await getPointageEnseignantModel(dbName);
  return await PointageEnseignant.create(pointageEnseignant);
};

const getPointageEnseignants = async (dbName) => {
  const PointageEnseignant = await getPointageEnseignantModel(dbName);
  return await PointageEnseignant.find()
    .populate("id_enseignant")
    .populate("id_seance");
};

const updatePointageEnseignant = async (id, updateData, dbName) => {
  const PointageEnseignant = await getPointageEnseignantModel(dbName);
  return await PointageEnseignant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deletePointageEnseignant = async (id, dbName) => {
  const PointageEnseignant = await getPointageEnseignantModel(dbName);
  return await PointageEnseignant.findByIdAndDelete(id);
};

const getPointageEnseignantById = async (id, dbName) => {
  const PointageEnseignant = await getPointageEnseignantModel(dbName);
  return await PointageEnseignant.findById(id);
};

const getPointageByEnseignantId = async (enseignantId, dbName) => {
  const query = {
    id_enseignant: enseignantId,
  };
  const PointageEnseignant = await getPointageEnseignantModel(dbName);
  return await PointageEnseignant.find(query)
    .populate("id_enseignant")
    .populate({
      path: "id_seance",
      populate: [
        { path: "matiere", model: "Matiere" },
        { path: "classe", model: "Classe" },
        { path: "salle", model: "Salle" },
      ],
    });
};

module.exports = {
  createPointageEnseignant,
  getPointageEnseignants,
  updatePointageEnseignant,
  deletePointageEnseignant,
  getPointageEnseignantById,
  getPointageByEnseignantId,
};
