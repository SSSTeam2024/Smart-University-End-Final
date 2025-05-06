const AbsenceEtudiantSchema = require("../../model/AbsenceEtudiantModel/AbsenceEtudiantModel");
const mongoose = require("mongoose");

function getAbsenceEtudiantModel(dbConnection) {
  return (
    dbConnection.models.AbsenceEtudiant ||
    dbConnection.model("AbsenceEtudiant", AbsenceEtudiantSchema)
  );
}

const createAbsenceEtudiant = async (absenceEtudiantData, dbName) => {
  const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
  const absenceEtudiant = new AbsenceEtudiant(absenceEtudiantData);
  return absenceEtudiant.save();
};

const getAllAbsenceEtudiants = async (dbName) => {
  const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
  return AbsenceEtudiant.find()
    .populate("classe")
    .populate("seance")
    .populate("departement")
    .populate("enseignant")
    .populate({
      path: "etudiants",
      populate: { path: "etudiant" },
    })
    .populate({
      path: "seance",
      populate: [{ path: "matiere" }, { path: "salle" }],
    });
};

const getAbsenceEtudiantById = async (id, dbName) => {
  const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
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

const updateAbsenceEtudiant = async (id, updateData, dbName) => {
  const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
  return AbsenceEtudiant.findByIdAndUpdate(id, updateData, { new: true })
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

const deleteAbsenceEtudiant = async (id, dbName) => {
  const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
  return AbsenceEtudiant.findByIdAndDelete(id);
};

const getAllAbsenceClasse = async (id, dbName) => {
  const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
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
    .populate("enseignant")
    .populate({
      path: "seance",
      populate: [
        { path: "matiere" }, // Correctly populates matiere
        { path: "salle" }, // Correctly populates salle
      ],
    });
};

const getAbsencesByTeacherId = async (teacherId, dbName) => {
  try {
    const AbsenceEtudiant = getAbsenceEtudiantModel(dbName);
    const objectId = new mongoose.Types.ObjectId(teacherId);

    const absences = await AbsenceEtudiant.find({ enseignant: objectId })
      .populate("classe")
      .populate("etudiants.etudiant")
      .populate("departement")
      .populate("seance")
      .populate({
        path: "seance",
        populate: [
          { path: "matiere", model: "Matiere" },
          { path: "salle", model: "Salle" },
        ],
      })
      .populate("added_by")
      .sort({ date: -1 });

    const filteredAbsences = absences.map((absence) => ({
      ...absence.toObject(),
      etudiants: absence.etudiants.filter((e) => e.typeAbsent === "A"),
    }));

    return filteredAbsences;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAbsenceEtudiant,
  getAllAbsenceEtudiants,
  getAbsenceEtudiantById,
  updateAbsenceEtudiant,
  deleteAbsenceEtudiant,
  getAllAbsenceClasse,
  getAbsencesByTeacherId,
};
