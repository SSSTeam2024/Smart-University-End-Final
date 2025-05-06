const gradeEnseignantDao = require("../../dao/GradeEnseignantDao/GradeEnseignantDao");
const { getDb } = require("../../config/dbSwitcher");

const registerGradeEnseignant = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await gradeEnseignantDao.createGradeEnseignant(userData, db);
};

const updateGradeEnseignantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await gradeEnseignantDao.updateGradeEnseignant(id, updateData, db);
};

const getGradeEnseignantDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await gradeEnseignantDao.getGradeEnseignantById(id, db);
};

const getGradesEnseignantDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await gradeEnseignantDao.getGradesEnseignant(db);
  return result;
};

const deleteGradeEnseignantDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await gradeEnseignantDao.deleteGradeEnseignant(id, db);
};

const getGradeByValue = async ({ grade_ar, grade_fr }, useNew) => {
  const db = await getDb(useNew);
  return await gradeEnseignantDao.getGradeByValue(grade_ar, grade_fr, db);
};

module.exports = {
  registerGradeEnseignant,
  deleteGradeEnseignantDao,
  getGradesEnseignantDao,
  getGradeEnseignantDaoById,
  updateGradeEnseignantDao,
  getGradeByValue,
};
