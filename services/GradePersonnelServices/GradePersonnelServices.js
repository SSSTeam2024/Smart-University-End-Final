const GradePersonnelDao = require("../../dao/GradePersonnelDao/GradePersonnelDao");

const registerGradePersonnel = async (userData) => {
  return await GradePersonnelDao.createGradePersonnel(userData);
};

const updateGradePersonnelDao = async (id, updateData) => {
  return await GradePersonnelDao.updateGradePersonnel(id, updateData);
};

const getGradePersonnelDaoById = async (id) => {
  return await GradePersonnelDao.getGradePersonnelById(id);
};

const getGradesPersonnelDao = async () => {
  return await GradePersonnelDao.getGradesPersonnel();
};

const deleteGradePersonnelDao = async (id) => {
  return await GradePersonnelDao.deleteGradePersonnel(id);
};

const getGradeByValue = async ({ grade_ar, grade_fr }) => {
  return await GradePersonnelDao.getGradeByValue(grade_ar, grade_fr);
};

module.exports = {
  registerGradePersonnel,
  deleteGradePersonnelDao,
  getGradesPersonnelDao,
  getGradePersonnelDaoById,
  updateGradePersonnelDao,
  getGradeByValue,
};
