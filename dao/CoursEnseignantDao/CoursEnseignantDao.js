const CoursEnseignant = require("../../model/CoursEnseignantModel/CoursEnseignantModel");

const addCoursEnseignant = async (coursEnseignantData) => {
  try {
    const newCoursEnseignant = await CoursEnseignant.create(
      coursEnseignantData
    );
    return newCoursEnseignant;
  } catch (error) {
    throw new Error(`Error adding Cours Enseignant: ${error.message}`);
  }
};

const getCoursEnseignants = async () => {
  const result = await CoursEnseignant.find()
    .populate("classe")
    .populate("enseignant");
  return result;
};

const updateCoursEnseignant = async (id, updateData) => {
  return await CoursEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCoursEnseignant = async (id) => {
  return await CoursEnseignant.findByIdAndDelete(id)
    .populate("classe")
    .populate("enseignant");
};

const getCoursEnseignantById = async (id) => {
  return await CoursEnseignant.findById(id);
};

const getCoursEnseignantByIdClasse = async (id) => {
  return await CoursEnseignant.find({ classe: { $in: [id] } })
    .populate("classe")
    .populate("enseignant");
};

const getSupportCoursByTeacherId = async (enseignantId) => {
  try {
    return await CoursEnseignant.find({ enseignant: enseignantId })
      .populate("enseignant")
      .populate("classe")
  } catch (error) {
    console.error("Error fetching support cours by teacher ID:", error);
    throw error;
  }
};

const deleteSupportCoursEnseignant = async (id) => {
  return await CoursEnseignant.findByIdAndDelete(id);
};

module.exports = {
  addCoursEnseignant,
  getCoursEnseignantById,
  deleteCoursEnseignant,
  updateCoursEnseignant,
  getCoursEnseignants,
  getCoursEnseignantByIdClasse,
  getSupportCoursByTeacherId,
  deleteSupportCoursEnseignant
};
