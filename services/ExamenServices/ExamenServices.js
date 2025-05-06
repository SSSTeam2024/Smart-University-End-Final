const examenDao = require("../../dao/ExamenDao/ExamenDao");
const { getDb } = require("../../config/dbSwitcher");

const createExamen = async (examen, useNew) => {
  const db = await getDb(useNew);
  return await examenDao.createExamen(examen, db);
};

const updateExamen = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await examenDao.updateExamen(id, updateData, db);
};

const getExamenById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await examenDao.getExamenById(id, db);
};

const getAllExamens = async (useNew) => {
  const db = await getDb(useNew);
  const result = await examenDao.getExamens(db);
  return result;
};

const deleteExamen = async (useNew, id) => {
  const db = await getDb(useNew);
  return await examenDao.deleteExamen(db, id);
};

const getExamensBySemesterAndRegime = async (semester, regime, useNew) => {
  const db = await getDb(useNew);
  return await examenDao.getExamensBySemesterAndRegime(semester, regime, db);
};

const editCalendrierExamens = async (editData, useNew) => {
  const db = await getDb(useNew);
  let id_Calendrier = editData.id_Calendrier;
  let epreuveId = editData.epreuveId;
  let epreuve_status = editData.epreuve_status;
  let nbre_present = editData.nbre_present;
  let nbre_absent = editData.nbre_absent;
  let nbre_exclus = editData.nbre_exclus;
  let notes = editData.notes;
  await examenDao.editCalendrierExamens(
    id_Calendrier,
    epreuveId,
    epreuve_status,
    nbre_present,
    nbre_absent,
    nbre_exclus,
    notes,
    db
  );
  return "Success Edit Calendar!!";
};

module.exports = {
  deleteExamen,
  getAllExamens,
  getExamenById,
  createExamen,
  updateExamen,
  getExamensBySemesterAndRegime,
  editCalendrierExamens,
};
