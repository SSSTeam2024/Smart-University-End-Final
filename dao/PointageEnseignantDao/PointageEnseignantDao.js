const PointageEnseignant = require("../../model/PointageEnseignantModel/PointageEnseignantModel");

const createPointageEnseignant = async (pointageEnseignant) => {
  return await PointageEnseignant.create(pointageEnseignant);
};

const getPointageEnseignants = async () => {
  return await PointageEnseignant.find()
    .populate("id_enseignant")
    .populate("id_seance");
};

const updatePointageEnseignant = async (id, updateData) => {
  return await PointageEnseignant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deletePointageEnseignant = async (id) => {
  return await PointageEnseignant.findByIdAndDelete(id);
};

const getPointageEnseignantById = async (id) => {
  return await PointageEnseignant.findById(id);
};

const getPointageByEnseignantId = async (enseignantId) => {
  const query = {
    id_enseignant: enseignantId,
  };

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
