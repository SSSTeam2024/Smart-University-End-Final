const DossierAdministratifSchema = require("../../model/DossierAdministratifModel/DossierAdministratifModel");

function getDossierAdministratifModel(dbConnection) {
  return (
    dbConnection.models.DossierAdministratif ||
    dbConnection.model("DossierAdministratif", DossierAdministratifSchema)
  );
}

const addDossierAdministratif = async (dossierData, dbName) => {
  try {
    const DossierAdministratif = await getDossierAdministratifModel(dbName);
    return await DossierAdministratif.create(dossierData);
  } catch (error) {
    console.error("Error creating dossier:", error);
    throw error;
  }
};

const getDossiersAdministratifs = async (dbName) => {
  try {
    const DossierAdministratif = await getDossierAdministratifModel(dbName);
    return await DossierAdministratif.find()
      .populate("enseignant")
      .populate("personnel")
      .populate({
        path: "papers.papier_administratif",
        model: "PapierAdministratif",
      })
      .exec();
  } catch (error) {
    console.error("Error fetching dossiers:", error);
    throw error;
  }
};

const updateDossiersAdministratif = async (id, updateData, dbName) => {
  try {
    const DossierAdministratif = await getDossierAdministratifModel(dbName);
    return await DossierAdministratif.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("enseignant")
      .populate("personnel")
      .populate({
        path: "papers.papier_administratif",
        model: "PapierAdministratif",
      });
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

const removeSpecificPaperFromDossier = async (
  dossierId,
  userId,
  userType,
  paperDetails,
  dbName
) => {
  const query = {
    _id: dossierId,
    [userType]: userId,
  };
  const DossierAdministratif = await getDossierAdministratifModel(dbName);
  const update = {
    $pull: {
      papers: {
        papier_administratif: paperDetails.papier_administratif,
        annee: paperDetails.annee,
        remarques: paperDetails.remarques,
        file: paperDetails.file,
      },
    },
  };
  return await DossierAdministratif.findOneAndUpdate(query, update, {
    new: true,
  });
};

const getDossierById = async (dossierId, dbName) => {
  try {
    const DossierAdministratif = await getDossierAdministratifModel(dbName);
    return await DossierAdministratif.findById(dossierId)
      .populate("enseignant")
      .populate("personnel");
  } catch (error) {
    console.error("Error fetching dossier by ID:", error);
    throw error;
  }
};

const archiveDossierAdministratif = async (dossierId, dbName) => {
  try {
    const DossierAdministratif = await getDossierAdministratifModel(dbName);
    const archivedDossier = await DossierAdministratif.findByIdAndUpdate(
      dossierId,
      { isArchived: true },
      { new: true }
    );
    return archivedDossier;
  } catch (error) {
    console.error("Error archiving dossier:", error);
    throw error;
  }
};

const restoreDossierAdministratif = async (dossierId, dbName) => {
  try {
    const DossierAdministratif = await getDossierAdministratifModel(dbName);
    const restoredDossier = await DossierAdministratif.findByIdAndUpdate(
      dossierId,
      { isArchived: false },
      { new: true }
    );
    return restoredDossier;
  } catch (error) {
    console.error("Error restoring dossier:", error);
    throw error;
  }
};

module.exports = {
  addDossierAdministratif,
  getDossiersAdministratifs,
  removeSpecificPaperFromDossier,
  updateDossiersAdministratif,
  archiveDossierAdministratif,
  getDossierById,
  restoreDossierAdministratif,
};
