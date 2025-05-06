const typeSeanceDao = require("../../dao/TypeSeance/TypeSeance");
const { getDb } = require("../../config/dbSwitcher");

const createTypeSeance = async (data, useNew) => {
  const db = await getDb(useNew);
  let typeSeance = await typeSeanceDao.createTypeSeance(data, db);
  return typeSeance;
};

const updateTypeSeance = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await typeSeanceDao.updateTypeSeance(id, updateData, db);
};
const getTypeSeances = async (useNew) => {
  const db = await getDb(useNew);
  return await typeSeanceDao.getTypeSeances(db);
};

const deleteTypeSeance = async (id, useNew) => {
  const db = await getDb(useNew);
  return await typeSeanceDao.deleteTypeSeance(id, db);
};

module.exports = {
  createTypeSeance,
  updateTypeSeance,
  getTypeSeances,
  deleteTypeSeance,
};
