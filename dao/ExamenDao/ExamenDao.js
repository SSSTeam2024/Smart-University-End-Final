const examenModel = require("../../model/ExamenModel/ExamenModel");

const createExamen = async (examen) => {
  try {
    return await examenModel.create(examen);
  } catch (error) {
    console.error("Error creating Examen:", error);
    throw error;
  }
};

const getExamens = async () => {
  try {
    return await examenModel
      .find()
      .populate("group_enseignant.enseignant")
      .populate({
        path: "epreuve.salle",
      })
      .populate("epreuve.matiere")
      .populate("epreuve.classe")
      .populate({
        path: "epreuve.group_surveillants",
      });
  } catch (error) {
    console.error("Error fetching Examens:", error);
    throw error;
  }
};

const updateExamen = async (id, updateData) => {
  try {
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
      });
  } catch (error) {
    console.error("Error updating Examen:", error);
    throw error;
  }
};

const deleteExamen = async (id) => {
  try {
    return await examenModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting Examen:", error);
    throw error;
  }
};

const getExamenById = async (id) => {
  try {
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
      });
  } catch (error) {
    console.error("Error fetching Examen by ID:", error);
    throw error;
  }
};

module.exports = {
  createExamen,
  getExamens,
  updateExamen,
  deleteExamen,
  getExamenById,
};
