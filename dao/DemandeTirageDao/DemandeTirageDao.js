const DemandeTirageSchema = require("../../model/DemandeTirageModel/DemandeTirageModel");

function getDemandeTirageModel(dbConnection) {
  return (
    dbConnection.models.DemandeTirage ||
    dbConnection.model("DemandeTirage", DemandeTirageSchema)
  );
}

const createDemandeTirage = async (demandeTirageData, dbName) => {
  const DemandeTirage = await getDemandeTirageModel(dbName);
  const demandeTirage = new DemandeTirage(demandeTirageData);
  return demandeTirage.save();
};

const getAllDemandesTirage = async (dbName) => {
  const DemandeTirage = await getDemandeTirageModel(dbName);
  return DemandeTirage.find()
    .populate("classes")
    .populate("enseignant")
    .populate("matiere")
    .populate({
      path: "added_by",
      populate: [
        {
          path: "enseignantId",
        },
        {
          path: "personnelId",
        },
      ],
    });
};

const deleteDemandeTirage = async (id, dbName) => {
  const DemandeTirage = await getDemandeTirageModel(dbName);
  return DemandeTirage.findByIdAndDelete(id);
};

const updateEtatDemandeTirage = async (
  demandeTirageId,
  etat,
  date,
  heure,
  dbName
) => {
  try {
    const DemandeTirage = await getDemandeTirageModel(dbName);
    let date_recuperation = "";
    let heure_recuperation = "";
    let date_impression = "";
    let heure_impression = "";
    let date_refus = "";
    let heure_refus = "";

    switch (etat) {
      case "Imprimée":
        date_impression = date;
        heure_impression = heure;
        break;

      case "Réfusée":
        date_refus = date;
        heure_refus = heure;
        break;

      case "Récupérée":
        date_recuperation = date;
        heure_recuperation = heure;
        break;

      default:
        break;
    }

    const updatedDemandeTirage = await DemandeTirage.findByIdAndUpdate(
      demandeTirageId,
      {
        etat,
        date_recuperation,
        heure_recuperation,
        date_impression,
        heure_impression,
        date_refus,
        heure_refus,
      },
      { new: true }
    );
    if (!updatedDemandeTirage) {
      throw new Error(`Demande Tirage with ID ${demandeTirageId} not found.`);
    }
    return updatedDemandeTirage;
  } catch (error) {
    throw new Error(`Failed to update Demande Tirage: ${error.message}`);
  }
};

const getDemandesTirageByTeacherId = async (enseignantId, dbName) => {
  try {
    const DemandeTirage = await getDemandeTirageModel(dbName);
    return await DemandeTirage.find({ enseignant: enseignantId })
      .populate("enseignant")
      .populate("classes")
      .populate("added_by");
  } catch (error) {
    console.error("Error fetching demandes tirage by teacher ID:", error);
    throw error;
  }
};

const deleteManyDemandesTirages = async (dbName, ids) => {
  const demandeTirageModel = await getDemandeTirageModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await demandeTirageModel.deleteMany(query);
};

module.exports = {
  createDemandeTirage,
  getAllDemandesTirage,
  deleteDemandeTirage,
  updateEtatDemandeTirage,
  getDemandesTirageByTeacherId,
  deleteManyDemandesTirages,
};
