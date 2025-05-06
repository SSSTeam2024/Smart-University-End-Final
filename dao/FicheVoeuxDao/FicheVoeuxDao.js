const ficheVoeuxSchema = require("../../model/FicheVoeuxModel/FicheVoeuxModel");

function getFicheVoeuxModel(dbConnection) {
  return (
    dbConnection.models.ficheVoeux ||
    dbConnection.model("ficheVoeux", ficheVoeuxSchema)
  );
}

const createficheVoeux = async (data, dbName) => {
  const ficheVoeuxModel = await getFicheVoeuxModel(dbName);
  return await ficheVoeuxModel.create(data);
};

const getFichesVoeux = async (dbName) => {
  const ficheVoeuxModel = await getFicheVoeuxModel(dbName);
  return await ficheVoeuxModel
    .find()
    .populate({
      path: "fiche_voeux_classes",
      populate: {
        path: "classe",
        populate: [
          {
            path: "subject_id",
          },
          {
            path: "class_id",
          },
        ],
      },
    })
    .populate({
      path: "enseignant",
      populate: {
        path: "grade",
        populate: {
          path: "charge_horaire",
        },
      },
    });
};

const updateFicheVoeux = async (id, updateData, dbName) => {
  const ficheVoeuxModel = await getFicheVoeuxModel(dbName);
  return await ficheVoeuxModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteFicheVoeuxById = async (id, dbName) => {
  const ficheVoeuxModel = await getFicheVoeuxModel(dbName);
  const deletedFicheVoeux = await ficheVoeuxModel.findByIdAndDelete(id);

  return deletedFicheVoeux;
};

module.exports = {
  createficheVoeux,
  getFichesVoeux,
  deleteFicheVoeuxById,
  updateFicheVoeux,
};
