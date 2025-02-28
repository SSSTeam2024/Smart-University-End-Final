const gradeEnseignantDao = require("../../dao/GradeEnseignantDao/GradeEnseignantDao");

const registerGradeEnseignant = async (userData) => {
  return await gradeEnseignantDao.createGradeEnseignant(userData);
};

const updateGradeEnseignantDao = async (id, updateData) => {
  return await gradeEnseignantDao.updateGradeEnseignant(id, updateData);
};

const getGradeEnseignantDaoById = async (id) => {
  return await gradeEnseignantDao.getGradeEnseignantById(id);
};

const getGradesEnseignantDao = async () => {
  const result = await gradeEnseignantDao.getGradesEnseignant();
  return result;
};

const deleteGradeEnseignantDao = async (id) => {
  return await gradeEnseignantDao.deleteGradeEnseignant(id);
};

const getGradeByValue = async ({ grade_ar, grade_fr }) => {
  return await gradeEnseignantDao.getGradeByValue(grade_ar, grade_fr);
};

module.exports = {
  registerGradeEnseignant,
  deleteGradeEnseignantDao,
  getGradesEnseignantDao,
  getGradeEnseignantDaoById,
  updateGradeEnseignantDao,
  getGradeByValue,
};
