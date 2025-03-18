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
          },{
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

// const deleteAbsenceEtudiant = async (id) => {
//   return AbsenceEtudiant.findByIdAndDelete(id);
// };

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

module.exports = {
  createDemandeTirage,
  getAllDemandesTirage
};
