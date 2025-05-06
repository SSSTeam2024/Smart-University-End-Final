const gradeEnseignantSchema = require("../../model/GradeEnseignantModel/GradeEnseignantModel");

function getGradeEnseignantModel(dbConnection) {
  return (
    dbConnection.models.GradeEnseignant ||
    dbConnection.model("GradeEnseignant", gradeEnseignantSchema)
  );
}

const createGradeEnseignant = async (grade_enseignant, dbName) => {
  const gradeEnseignant = await getGradeEnseignantModel(dbName);
  return await gradeEnseignant.create(grade_enseignant);
};

const getGradesEnseignant = async (dbName) => {
  const gradeEnseignant = await getGradeEnseignantModel(dbName);
  const result = await gradeEnseignant.find();
  return result;
};

const updateGradeEnseignant = async (id, updateData, dbName) => {
  const gradeEnseignant = await getGradeEnseignantModel(dbName);
  return await gradeEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteGradeEnseignant = async (id, dbName) => {
  const gradeEnseignant = await getGradeEnseignantModel(dbName);
  return await gradeEnseignant.findByIdAndDelete(id);
};

const getGradeEnseignantById = async (id, dbName) => {
  const gradeEnseignant = await getGradeEnseignantModel(dbName);
  return await gradeEnseignant.findById(id);
};

const getGradeByValue = async (grade_ar, grade_fr, dbName) => {
  const gradeEnseignant = await getGradeEnseignantModel(dbName);
  return await gradeEnseignant.findOne({ grade_ar, grade_fr });
};

module.exports = {
  createGradeEnseignant,
  getGradesEnseignant,
  updateGradeEnseignant,
  deleteGradeEnseignant,
  getGradeEnseignantById,
  getGradeByValue,
};
