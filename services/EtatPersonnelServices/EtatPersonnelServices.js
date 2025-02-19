const EtatPersonnelDao = require("../../dao/EtatPersonnelDao/EtatPersonnelDao");

const registerEtatPersonnel = async (userData) => {
  return await EtatPersonnelDao.createEtatPersonnel(userData);
};

const updateEtatPersonnelDao = async (id, updateData) => {
  return await EtatPersonnelDao.updateEtatPersonnel(id, updateData);
};

const getEtatPersonnelDaoById = async (id) => {
  return await EtatPersonnelDao.getEtatPersonnelById(id);
};

const getEtatsPersonnelDao = async () => {
  return await EtatPersonnelDao.getEtatsPersonnel();
};

const getEtatByValue = async ({ etat_ar, etat_fr }) => {
  return await EtatPersonnelDao.getEtatByValue(etat_ar, etat_fr);
};

const deleteEtatPersonnelDao = async (id) => {
  return await EtatPersonnelDao.deleteEtatPersonnel(id);
};

module.exports = {
  registerEtatPersonnel,
  deleteEtatPersonnelDao,
  getEtatsPersonnelDao,
  getEtatPersonnelDaoById,
  updateEtatPersonnelDao,
  getEtatByValue,
};
