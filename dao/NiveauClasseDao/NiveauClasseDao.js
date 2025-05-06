const niveauClasseSchema = require("../../model/NiveauClasseModel/NiveauClasseModel");

function getNiveauClasseModel(dbConnection) {
  return (
    dbConnection.models.NiveauClasse ||
    dbConnection.model("NiveauClasse", niveauClasseSchema)
  );
}

const createNiveauClasse = async (niveau, dbName) => {
  try {
    const niveauClasse = await getNiveauClasseModel(dbName);
    return await niveauClasse.create(niveau);
  } catch (error) {
    throw error;
  }
};

const getNiveauxClasse = async (dbName) => {
  const niveauClasse = await getNiveauClasseModel(dbName);
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

const updateNiveauClasse = async (id, updateData, dbName) => {
  const niveauClasse = await getNiveauClasseModel(dbName);
  return await niveauClasse
    .findByIdAndUpdate(id, updateData, { new: true })
    .populate("sections");
};

const deleteNiveauClasse = async (id, dbName) => {
  const niveauClasse = await getNiveauClasseModel(dbName);
  return await niveauClasse.findByIdAndDelete(id);
};

const getNiveauClasseById = async (id, dbName) => {
  const niveauClasse = await getNiveauClasseModel(dbName);
  return await niveauClasse.findById(id).populate("sections");
};

async function getSectionsByIdNiveau(niveauClasseId, dbName) {
  try {
    const niveauClasse = await getNiveauClasseModel(dbName);
    return await niveauClasse.findById(niveauClasseId).populate("sections");
  } catch (error) {
    throw error;
  }
}

async function getCyclesByIdNiveau(niveauClasseId, dbName) {
  try {
    const niveauClasse = await getNiveauClasseModel(dbName);
    return await niveauClasse.findById(niveauClasseId).populate("cycles");
  } catch (error) {
    throw error;
  }
}

const getNiveauByValue = async (name_niveau_ar, name_niveau_fr, dbName) => {
  const niveauClasse = await getNiveauClasseModel(dbName);
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
