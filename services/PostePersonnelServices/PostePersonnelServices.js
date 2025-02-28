const postePersonnelDao = require("../../dao/PostePersonnelDao/PostePersonnelDao");

const createPostePersonnel = async (userData) => {
  return await postePersonnelDao.createPostePersonnel(userData);
};

const updatePostePersonnelDao = async (id, updateData) => {
  return await postePersonnelDao.updatePostePersonnel(id, updateData);
};

const getPostePersonnelDaoById = async (id) => {
  return await postePersonnelDao.getPostePersonnelById(id);
};

const getPostesPersonnelDao = async () => {
  return await postePersonnelDao.getPostesPersonnel();
};

const deletePostePersonnelDao = async (id) => {
  return await postePersonnelDao.deletePostePersonnel(id);
};

const getPosteByValue = async ({ poste_ar, poste_fr }) => {
  return await postePersonnelDao.getPosteByValue(poste_ar, poste_fr);
};

module.exports = {
  deletePostePersonnelDao,
  getPostesPersonnelDao,
  getPostePersonnelDaoById,
  updatePostePersonnelDao,
  createPostePersonnel,
  getPosteByValue,
};
