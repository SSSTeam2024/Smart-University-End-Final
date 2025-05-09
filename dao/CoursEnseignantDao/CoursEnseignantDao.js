const CoursEnseignantSchema = require("../../model/CoursEnseignantModel/CoursEnseignantModel");

function getCoursEnseignantModel(dbConnection) {
  return (
    dbConnection.models.CoursEnseignant ||
    dbConnection.model("CoursEnseignant", CoursEnseignantSchema)
  );
}

const addCoursEnseignant = async (coursEnseignantData, dbName) => {
  try {
    const CoursEnseignant = await getCoursEnseignantModel(dbName);
    const newCoursEnseignant = await CoursEnseignant.create(
      coursEnseignantData
    );
    return newCoursEnseignant;
  } catch (error) {
    throw new Error(`Error adding Cours Enseignant: ${error.message}`);
  }
};

const getCoursEnseignants = async (dbName) => {
  const CoursEnseignant = await getCoursEnseignantModel(dbName);
  const result = await CoursEnseignant.find()
    .populate("classe")
    .populate("enseignant");
  return result;
};

const updateCoursEnseignant = async (id, updateData, dbName) => {
  const CoursEnseignant = await getCoursEnseignantModel(dbName);
  return await CoursEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCoursEnseignant = async (id, dbName) => {
  const CoursEnseignant = await getCoursEnseignantModel(dbName);
  return await CoursEnseignant.findByIdAndDelete(id)
    .populate("classe")
    .populate("enseignant");
};

const getCoursEnseignantById = async (id, dbName) => {
  const CoursEnseignant = await getCoursEnseignantModel(dbName);
  return await CoursEnseignant.findById(id);
};

const getCoursEnseignantByIdClasse = async (id, dbName) => {
  const CoursEnseignant = await getCoursEnseignantModel(dbName);
  return await CoursEnseignant.find({ classe: { $in: [id] } })
    .populate("classe")
    .populate("enseignant");
};

const getSupportCoursByTeacherId = async (enseignantId, dbName) => {
  try {
    const CoursEnseignant = await getCoursEnseignantModel(dbName);
    return await CoursEnseignant.find({ enseignant: enseignantId })
      .populate("enseignant")
      .populate("classe");
  } catch (error) {
    console.error("Error fetching support cours by teacher ID:", error);
    throw error;
  }
};

const deleteSupportCoursEnseignant = async (id, dbName) => {
  const CoursEnseignant = await getCoursEnseignantModel(dbName);
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
  deleteSupportCoursEnseignant,
};
