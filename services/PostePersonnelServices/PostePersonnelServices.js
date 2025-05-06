const postePersonnelDao = require("../../dao/PostePersonnelDao/PostePersonnelDao");
const { getDb } = require("../../config/dbSwitcher");

const createPostePersonnel = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await postePersonnelDao.createPostePersonnel(userData, db);
};

const updatePostePersonnelDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await postePersonnelDao.updatePostePersonnel(id, updateData, db);
};

const getPostePersonnelDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await postePersonnelDao.getPostePersonnelById(id, db);
};

const getPostesPersonnelDao = async (useNew) => {
  const db = await getDb(useNew);
  return await postePersonnelDao.getPostesPersonnel(db);
};

const deletePostePersonnelDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await postePersonnelDao.deletePostePersonnel(id, db);
};

const getPosteByValue = async ({ poste_ar, poste_fr }, useNew) => {
  const db = await getDb(useNew);
  return await postePersonnelDao.getPosteByValue(poste_ar, poste_fr, db);
};

module.exports = {
  deletePostePersonnelDao,
  getPostesPersonnelDao,
  getPostePersonnelDaoById,
  updatePostePersonnelDao,
  createPostePersonnel,
  getPosteByValue,
};
