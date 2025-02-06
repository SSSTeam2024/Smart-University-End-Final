const specialiteEnseignantDao = require("../../dao/SpecialiteEnseignantDao/SpecialiteEnseignantDao");

const registerSpecialiteEnseignant = async (userData) => {
  return await specialiteEnseignantDao.createSpecialiteEnseignant(userData);
};

const updateSpecialiteEnseignantDao = async (id, updateData) => {
  return await specialiteEnseignantDao.updateSpecialiteEnseignant(
    id,
    updateData
  );
};

const getSpecialiteEnseignantDaoById = async (id) => {
  return await specialiteEnseignantDao.getSpecialiteEnseignantById(id);
};

const getSpecialitesEnseignantDao = async () => {
  const result = await specialiteEnseignantDao.getSpecialitesEnseignant();
  return result;
};

const deleteSpecialiteEnseignantDao = async (id) => {
  return await specialiteEnseignantDao.deleteSpecialiteEnseignant(id);
};

const getSpecialiteByValue = async ({ specialite_ar, specialite_fr }) => {
  return await specialiteEnseignantDao.getSpecialiteByValue(
    specialite_ar,
    specialite_fr
  );
};

module.exports = {
  registerSpecialiteEnseignant,
  deleteSpecialiteEnseignantDao,
  getSpecialitesEnseignantDao,
  getSpecialiteEnseignantDaoById,
  updateSpecialiteEnseignantDao,
  getSpecialiteByValue,
};
