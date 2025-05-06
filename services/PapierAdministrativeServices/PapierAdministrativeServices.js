const papierAdministratifDao = require("../../dao/PapierAdministratifDao/PapierAdministratifDao");
const { getDb } = require("../../config/dbSwitcher");

const addPapierAdministratif = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await papierAdministratifDao.addPapierAdministratif(userData, db);
};

const updatePapierAdministratif = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await papierAdministratifDao.updatePapierAdministratif(
    id,
    updateData,
    db
  );
};

const getPapierAdministratifById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await papierAdministratifDao.getPapierAdministratifById(id, db);
};

const gePapierAdministratifs = async (useNew) => {
  const db = await getDb(useNew);
  const result = await papierAdministratifDao.getPapierAdministratifs(db);
  return result;
};

const deletePapierAdministratif = async (id, useNew) => {
  const db = await getDb(useNew);
  return await papierAdministratifDao.deletePapierAdministratif(id, db);
};

module.exports = {
  addPapierAdministratif,
  deletePapierAdministratif,
  gePapierAdministratifs,
  updatePapierAdministratif,
  getPapierAdministratifById,
};
