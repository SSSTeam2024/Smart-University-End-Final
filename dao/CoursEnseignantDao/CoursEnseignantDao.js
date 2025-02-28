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

module.exports = {
  addCoursEnseignant,
  getCoursEnseignantById,
  deleteCoursEnseignant,
  updateCoursEnseignant,
  getCoursEnseignants,
};
