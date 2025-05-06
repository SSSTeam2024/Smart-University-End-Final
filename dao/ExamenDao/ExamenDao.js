const examenSchema = require("../../model/ExamenModel/ExamenModel");

function getExamenModel(dbConnection) {
  return (
    dbConnection.models.Examen || dbConnection.model("Examen", examenSchema)
  );
}

const createExamen = async (examen, dbName) => {
  try {
    const examenModel = await getExamenModel(dbName);
    return await examenModel.create(examen);
  } catch (error) {
    console.error("Error creating Examen:", error);
    throw error;
  }
};
const getExamens = async (dbName) => {
  try {
    const examenModel = await getExamenModel(dbName);
    return await examenModel
      .find()
      .populate("group_enseignant.enseignant")
      .populate("epreuve.salle")
      .populate("epreuve.matiere")
      .populate("epreuve.classe")
      .populate({
        path: "epreuve.group_surveillants",
      })
      .populate({
        path: "epreuve.group_responsables",
      });
  } catch (error) {
    console.error("Error fetching Examens:", error);
    throw error;
  }
};

const updateExamen = async (id, updateData, dbName) => {
  try {
    const examenModel = await getExamenModel(dbName);
    return await examenModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("group_enseignant.enseignant")
      .populate({
        path: "epreuve.salle",
      })
      .populate("epreuve.matiere")
      .populate("epreuve.classe")
      .populate({
        path: "epreuve.group_surveillants",
        path: "epreuve.group_responsables",
      });
  } catch (error) {
    console.error("Error updating Examen:", error);
    throw error;
  }
};

const deleteExamen = async (dbName, id) => {
  try {
    const examenModel = await getExamenModel(dbName);
    return await examenModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting Examen:", error);
    throw error;
  }
};

const getExamenById = async (id, dbName) => {
  try {
    const examenModel = await getExamenModel(dbName);
    return await examenModel
      .findById(id)
      .populate("group_enseignant.enseignant")
      .populate({
        path: "epreuve.salle",
      })
      .populate("epreuve.matiere")
      .populate("epreuve.classe")
      .populate({
        path: "epreuve.group_surveillants",
        path: "epreuve.group_responsables",
      });
  } catch (error) {
    console.error("Error fetching Examen by ID:", error);
    throw error;
  }
};

const getExamensBySemesterAndRegime = async (semester, regime, dbName) => {
  try {
    const examenModel = await getExamenModel(dbName);
    const examens = await examenModel
      .find({ semestre: semester })
      .populate({
        path: "epreuve.matiere",
        match: { regime_matiere: regime },
        populate: { path: "classes", model: "Classe" },
      })
      .populate("epreuve.salle")
      .populate("epreuve.classe")
      .populate("group_enseignant.enseignant");
    console.log("Examens after population:", examens);

    const filteredExamens = examens.filter((examen) =>
      examen.epreuve.some(
        (e) => e.matiere && e.matiere.regime_matiere === regime
      )
    );

    return filteredExamens;
  } catch (error) {
    throw new Error(`Failed to fetch examens: ${error.message}`);
  }
};

const editCalendrierExamens = async (
  id_Calendrier,
  epreuveId,
  epreuve_status,
  nbre_present,
  nbre_absent,
  nbre_exclus,
  notes,
  dbName
) => {
  try {
    const examenModel = await getExamenModel(dbName);
    const document = await examenModel.findOne({
      _id: id_Calendrier,
      "epreuve._id": epreuveId,
    });

    if (!document) {
      console.error(
        "No document found with the given id_Calendrier and epreuveId"
      );
      return null;
    }

    const updatedCalendar = await examenModel.findOneAndUpdate(
      { _id: id_Calendrier, "epreuve._id": epreuveId },
      {
        $set: {
          "epreuve.$.epreuveStatus": epreuve_status,
          "epreuve.$.nbrePresent": nbre_present,
          "epreuve.$.nbreAbsent": nbre_absent,
          "epreuve.$.nbreExclus": nbre_exclus,
          "epreuve.$.epreuveNotes": notes,
        },
      },
      { new: true }
    );

    return updatedCalendar;
  } catch (error) {
    throw new Error("Failed to update calendar: " + error.message);
  }
};

module.exports = {
  createExamen,
  getExamens,
  updateExamen,
  deleteExamen,
  getExamenById,
  getExamensBySemesterAndRegime,
  editCalendrierExamens,
};
