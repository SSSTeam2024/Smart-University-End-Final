const AbsenceEtudiant = require("../../model/AbsenceEtudiantModel/AbsenceEtudiantModel");

const createAbsenceEtudiant = async (absenceEtudiantData) => {
  const absenceEtudiant = new AbsenceEtudiant(absenceEtudiantData);
  return absenceEtudiant.save();
};

const getAllAbsenceEtudiants = async () => {
  return AbsenceEtudiant.find()
    .populate("classe")
    .populate("seance")
    .populate("departement")
    .populate({
      path: "etudiants",
      populate: {
        path: "etudiant",
      },
    })
    .populate("enseignant");
};

const getAbsenceEtudiantById = async (id) => {
  return AbsenceEtudiant.findById(id)
    .populate("classe")
    .populate("matiere")
    .populate("departement")
    .populate({
      path: "etudiants",
      populate: {
        path: "etudiant",
      },
    })
    .populate("enseignant");
};

const updateAbsenceEtudiant = async (id, updateData) => {
  return AbsenceEtudiant.findByIdAndUpdate(id, updateData, { new: true })
    .populate("classe")
    .populate("matiere")
    .populate("departement")
    .populate({
      path: "etudiants",
      populate: {
        path: "etudiant",
      },
    })
    .populate("enseignant");
};

const deleteAbsenceEtudiant = async (id) => {
  return AbsenceEtudiant.findByIdAndDelete(id);
};

const getAllAbsenceClasse = async (id) => {
  const query = {
    classe: id,
  };

  return await AbsenceEtudiant.find(query)
    .populate("classe")
    .populate("seance")
    .populate("departement")
    .populate({
      path: "etudiants",
      populate: {
        path: "etudiant",
      },
    })
    .populate("enseignant");
};

module.exports = {
  createAbsenceEtudiant,
  getAllAbsenceEtudiants,
  getAbsenceEtudiantById,
  updateAbsenceEtudiant,
  deleteAbsenceEtudiant,
  getAllAbsenceClasse,
};
