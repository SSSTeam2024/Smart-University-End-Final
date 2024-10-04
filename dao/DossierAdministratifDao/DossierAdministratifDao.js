const DossierAdministratif = require("../../model/DossierAdministratifModel/DossierAdministratifModel");
const EnseignantModel = require("../../model/EnseignantModel/EnseignantModel");
const PersonnelModel = require("../../model/PersonnelModel/PersonnelModel");
const addDossierAdministratif = async (dossierData) => {
  try {
    return await DossierAdministratif.create(dossierData);
  } catch (error) {
    console.error("Error creating dossier:", error);
    throw error;
  }
};

const getDossiersAdministratifs = async () => {
  try {
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

// const removePaperFromDossier = async (dossierId, papierId) => {
//   try {
//     const dossier = await DossierAdministratif.findById(dossierId);
//     if (!dossier) {
//       throw new Error('Dossier not found');
//     }
//     dossier.papers = dossier.papers.filter(paper => paper.papier_administratif.toString() !== papierId);
//     await dossier.save();
//     return dossier;
//   } catch (error) {
//     throw new Error(`DAO Error: ${error.message}`);
//   }
// };

const removePaperFromDossier = async (
  dossierId,
  papierId,
  entityId,
  entityType
) => {
  try {
    // Find and remove the paper from the DossierAdministratif
    const dossier = await DossierAdministratif.findById(dossierId);
    if (!dossier) {
      throw new Error("Dossier not found");
    }

    // Remove the paper from the papers array in DossierAdministratif
    dossier.papers = dossier.papers.filter(
      (paper) => paper.papier_administratif.toString() !== papierId
    );
    await dossier.save();

    // Check if entityType is "personnel" or "enseignant"
    let entityModel;
    if (entityType === "personnel") {
      entityModel = PersonnelModel;
    } else if (entityType === "enseignant") {
      entityModel = EnseignantModel;
    } else {
      throw new Error("Invalid entity type");
    }

    // Find the entity (personnel or enseignant) and remove the paper from their papers array
    const entity = await entityModel.findById(entityId);
    if (!entity) {
      throw new Error(
        `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} not found`
      );
    }

    // Filter out the paper from the entity's papers array
    entity.papers = entity.papers.filter(
      (paper) => paper.toString() !== dossierId
    );
    await entity.save();

    return dossier;
  } catch (error) {
    throw new Error(`DAO Error: ${error.message}`);
  }
};


const updateDossiersAdministratif = async (id, updateData) => {
  try {
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

module.exports = {
  addDossierAdministratif,
  getDossiersAdministratifs,
  removePaperFromDossier,
  updateDossiersAdministratif,
};