const GradePersonnelDao = require("../../dao/GradePersonnelDao/GradePersonnelDao");
const { getDb } = require("../../config/dbSwitcher");

const registerGradePersonnel = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await GradePersonnelDao.createGradePersonnel(userData, db);
};

const updateGradePersonnelDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await GradePersonnelDao.updateGradePersonnel(id, updateData, db);
};

const getGradePersonnelDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await GradePersonnelDao.getGradePersonnelById(id, db);
};

const getGradesPersonnelDao = async (useNew) => {
  const db = await getDb(useNew);
  return await GradePersonnelDao.getGradesPersonnel(db);
};

const deleteGradePersonnelDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await GradePersonnelDao.deleteGradePersonnel(id, db);
};

const getGradeByValue = async ({ grade_ar, grade_fr }, useNew) => {
  const db = await getDb(useNew);
  return await GradePersonnelDao.getGradeByValue(grade_ar, grade_fr, db);
};

module.exports = {
  registerGradePersonnel,
  deleteGradePersonnelDao,
  getGradesPersonnelDao,
  getGradePersonnelDaoById,
  updateGradePersonnelDao,
  getGradeByValue,
};
