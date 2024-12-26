const examenDao = require("../../dao/ExamenDao/ExamenDao");

const createExamen = async (examen) => {
  console.log("examen", examen);
  return await examenDao.createExamen(examen);
};

const updateExamen = async (id, updateData) => {
  return await examenDao.updateExamen(id, updateData);
};

const getExamenById = async (id) => {
  return await examenDao.getExamenById(id);
};

const getAllExamens = async () => {
  const result = await examenDao.getExamens();
  return result;
};

const deleteExamen = async (id) => {
  return await examenDao.deleteExamen(id);
};

const getExamensBySemesterAndRegime = async (semester, regime) => {
  return await examenDao.getExamensBySemesterAndRegime(semester, regime);
};

module.exports = {
  deleteExamen,
  getAllExamens,
  getExamenById,
  createExamen,
  updateExamen,
  getExamensBySemesterAndRegime,
};
