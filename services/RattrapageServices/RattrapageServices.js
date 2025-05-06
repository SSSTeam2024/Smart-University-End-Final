const rattrapageDao = require("../../dao/RattrapageDao/RattrapageDao");
const { getDb } = require("../../config/dbSwitcher");

const createRattrapage = async (data, useNew) => {
  const db = await getDb(useNew);
  let rattrapage = await rattrapageDao.createRattrapage(data, db);
  return rattrapage;
};

const getRattrapages = async (dbName) => {
  const db = await getDb(dbName);
  return await rattrapageDao.getRattrapages(db);
};

const updateRattrapageEtatStatusService = async (
  rattrapageId,
  etat,
  status,
  useNew
) => {
  const db = await getDb(useNew);
  if (!etat || !status) {
    throw new Error("Both 'etat' and 'status' must be provided.");
  }

  return await rattrapageDao.updateEtatAndStatusRattrapage(
    rattrapageId,
    etat,
    status,
    db
  );
};

const getRattrapagesByClassId = async (classId, useNew) => {
  const db = await getDb(useNew);
  return await rattrapageDao.getRattrapagesByClassId(classId, db);
};

const getRattrapagesByTeacherId = async (teacherId, useNew) => {
  const db = await getDb(useNew);
  return await rattrapageDao.getRattrapagesByTeacherId(teacherId, db);
};

const deleteManyRattrapages = async (dbName, ids) => {
  const db = await getDb(dbName);
  return await rattrapageDao.deleteManyRattrapages(db, ids);
};

module.exports = {
  createRattrapage,
  getRattrapages,
  updateRattrapageEtatStatusService,
  getRattrapagesByClassId,
  getRattrapagesByTeacherId,
  deleteManyRattrapages,
};
