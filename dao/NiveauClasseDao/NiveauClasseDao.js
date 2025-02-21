const niveauClasse = require("../../model/NiveauClasseModel/NiveauClasseModel");

const createNiveauClasse = async (niveau) => {
  try {
    return await niveauClasse.create(niveau);
  } catch (error) {
    throw error;
  }
};

const getNiveauxClasse = async () => {
  return await niveauClasse.find().populate([
    {
      path: "sections",
      populate: {
        path: "mention_classe",
        populate: {
          path: "domaine",
        },
      },
    },
    {
      path: "cycles",
    },
  ]);
};

const updateNiveauClasse = async (id, updateData) => {
  return await niveauClasse
    .findByIdAndUpdate(id, updateData, { new: true })
    .populate("sections");
};

const deleteNiveauClasse = async (id) => {
  return await niveauClasse.findByIdAndDelete(id);
};

const getNiveauClasseById = async (id) => {
  return await niveauClasse.findById(id).populate("sections");
};

// get sections by id niveau

async function getSectionsByIdNiveau(niveauClasseId) {
  try {
    return await niveauClasse.findById(niveauClasseId).populate("sections");
  } catch (error) {
    throw error;
  }
}
// getSections By Id Cycle

async function getCyclesByIdNiveau(niveauClasseId) {
  try {
    return await niveauClasse.findById(niveauClasseId).populate("cycles");
  } catch (error) {
    throw error;
  }
}

const getNiveauByValue = async (name_niveau_ar, name_niveau_fr) => {
  return await niveauClasse.findOne({ name_niveau_ar, name_niveau_fr });
};

module.exports = {
  createNiveauClasse,
  getNiveauxClasse,
  updateNiveauClasse,
  deleteNiveauClasse,
  getNiveauClasseById,
  getSectionsByIdNiveau,
  getCyclesByIdNiveau,
  getNiveauByValue,
};
