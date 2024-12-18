const classEmploiPeriodiqueDao = require("../../dao/ClassEmploiPeriodiqueDao/ClassEmploiPeriodiqueDao");

const createClassEmploiPeriodique = async (params) => {
  try {
    return await classEmploiPeriodiqueDao.createClassEmploiPeriodique(params);
  } catch (error) {
    console.error("Error when creating time table params", error);
    throw error;
  }
};

const updateClassEmploiPeriodique = async (id, updateData) => {
  return await classEmploiPeriodiqueDao.updateClassEmploiPeriodique(
    id,
    updateData
  );
};

const getClassEmploiPeriodique = async (id) => {
  const result = await classEmploiPeriodiqueDao.getClassEmploiPeriodique(id);
  return result;
};

const getEmploiPeriodiqueByClasse = async (classId, semestre) => {
  const result = await classEmploiPeriodiqueDao.getEmploiPeriodiqueByClass(
    classId,
    semestre
  );
  return result;
};

module.exports = {
  createClassEmploiPeriodique,
  updateClassEmploiPeriodique,
  getClassEmploiPeriodique,
  getEmploiPeriodiqueByClasse,
};