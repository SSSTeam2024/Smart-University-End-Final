const specialiteEnseignantDao = require("../../dao/SpecialiteEnseignantDao/SpecialiteEnseignantDao");
const { getDb } = require("../../config/dbSwitcher");

const registerSpecialiteEnseignant = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await specialiteEnseignantDao.createSpecialiteEnseignant(userData, db);
};

const updateSpecialiteEnseignantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await specialiteEnseignantDao.updateSpecialiteEnseignant(
    id,
    updateData,
    db
  );
};

const getSpecialiteEnseignantDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await specialiteEnseignantDao.getSpecialiteEnseignantById(id, db);
};

const getSpecialitesEnseignantDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await specialiteEnseignantDao.getSpecialitesEnseignant(db);
  return result;
};

const deleteSpecialiteEnseignantDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await specialiteEnseignantDao.deleteSpecialiteEnseignant(id, db);
};

const getSpecialiteByValue = async (
  { specialite_ar, specialite_fr },
  useNew
) => {
  const db = await getDb(useNew);
  return await specialiteEnseignantDao.getSpecialiteByValue(
    specialite_ar,
    specialite_fr,
    db
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
