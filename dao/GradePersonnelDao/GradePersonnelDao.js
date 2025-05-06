const gradePersonnelSchema = require("../../model/GradePersonnelModel/GradePersonnelModel");

function getGradePersonnelModel(dbConnection) {
  return (
    dbConnection.models.GradePersonnel ||
    dbConnection.model("GradePersonnel", gradePersonnelSchema)
  );
}

const createGradePersonnel = async (grade_perso, dbName) => {
  const gradePersonnel = await getGradePersonnelModel(dbName);
  return await gradePersonnel.create(grade_perso);
};

const getGradesPersonnel = async (dbName) => {
  const gradePersonnel = await getGradePersonnelModel(dbName);
  return await gradePersonnel.find();
};

const updateGradePersonnel = async (id, updateData, dbName) => {
  const gradePersonnel = await getGradePersonnelModel(dbName);
  return await gradePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteGradePersonnel = async (id, dbName) => {
  const gradePersonnel = await getGradePersonnelModel(dbName);
  return await gradePersonnel.findByIdAndDelete(id);
};

const getGradePersonnelById = async (id, dbName) => {
  const gradePersonnel = await getGradePersonnelModel(dbName);
  return await gradePersonnel.findById(id);
};

const getGradeByValue = async (grade_ar, grade_fr, dbName) => {
  const gradePersonnel = await getGradePersonnelModel(dbName);
  return await gradePersonnel.findOne({ grade_ar, grade_fr });
};

module.exports = {
  createGradePersonnel,
  getGradesPersonnel,
  updateGradePersonnel,
  deleteGradePersonnel,
  getGradePersonnelById,
  getGradeByValue,
};
