const DemandeTirage = require("../../model/DemandeTirageModel/DemandeTirageModel");

const createDemandeTirage = async (demandeTirageData) => {
  const demandeTirage = new DemandeTirage(demandeTirageData);
  return demandeTirage.save();
};

const getAllDemandesTirage = async () => {
  return DemandeTirage.find().populate("classes").populate("enseignant").populate("matiere").populate({
    path: "added_by",
    populate: [{
      path: "enseignantId",
    }, {
      path: "personnelId",
    }]
  });
};

// const getAbsenceEtudiantById = async (id) => {
//   return AbsenceEtudiant.findById(id)
//     .populate("classe")
//     .populate("matiere")
//     .populate("departement")
//     .populate({
//       path: "etudiants",
//       populate: {
//         path: "etudiant",
//       },
//     })
//     .populate("enseignant");
// };

// const updateAbsenceEtudiant = async (id, updateData) => {
//   return AbsenceEtudiant.findByIdAndUpdate(id, updateData, { new: true })
//     .populate("classe")
//     .populate("seance")
//     .populate("departement")
//     .populate({
//       path: "etudiants",
//       populate: {
//         path: "etudiant",
//       },
//     })
//     .populate("enseignant");
// };

const deleteDemandeTirage = async (id) => {
  return DemandeTirage.findByIdAndDelete(id);
};
const updateEtatDemandeTirage = async (demandeTirageId, etat, date, heure) => {
  try {
    let date_recuperation = '';
    let heure_recuperation = '';
    let date_impression = '';
    let heure_impression = '';
    let date_refus = '';
    let heure_refus = '';

    switch (etat) {
      case 'Imprimée':
        date_impression = date;
        heure_impression = heure;
        break;

      case 'Réfusée':
        date_refus = date;
        heure_refus = heure;
        break;

      case 'Récupérée':
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
        heure_refus
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

// const getAllAbsenceClasse = async (id) => {
//   const query = {
//     classe: id,
//   };

//   return await AbsenceEtudiant.find(query)
//     .populate("classe")
//     .populate("seance")
//     .populate("departement")
//     .populate({
//       path: "etudiants",
//       populate: {
//         path: "etudiant",
//       },
//     })
//     .populate("enseignant")
//     .populate({
//       path: "seance",
//       populate: [
//         { path: "matiere" }, // Correctly populates matiere
//         { path: "salle" }, // Correctly populates salle
//       ],
//     });
// };

const getDemandesTirageByTeacherId = async (enseignantId) => {
  try {
    return await DemandeTirage.find({ enseignant: enseignantId })
      .populate("enseignant")
      .populate("classes")
      .populate("added_by");
  } catch (error) {
    console.error("Error fetching demandes tirage by teacher ID:", error);
    throw error;
  }
};
module.exports = {
  createDemandeTirage,
  getAllDemandesTirage,
  deleteDemandeTirage,
  updateEtatDemandeTirage,
  getDemandesTirageByTeacherId
};
