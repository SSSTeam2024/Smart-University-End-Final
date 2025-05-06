const domaineClasseDao = require("../../dao/DomaineClasseDao/DomaineClasseDao");
const { getDb } = require("../../config/dbSwitcher");

const createDomaineClasse = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const domaineClasse = await domaineClasseDao.createDomaineClasse(
      userData,
      db
    );

    return domaineClasse;
  } catch (error) {
    console.error("Error in registering domaine classe:", error);
    throw error;
  }
};

const updateDomaineClasse = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await domaineClasseDao.updateDomaineClasse(id, updateData, db);
};

const getDomainesClasse = async (useNew) => {
  const db = await getDb(useNew);
  return await domaineClasseDao.getDomainesClasse(db);
};

const deleteDomaineClasse = async (id, useNew) => {
  const db = await getDb(useNew);
  return await domaineClasseDao.deleteDomaineClasse(id, db);
};

const getDomaineByValue = async (
  { name_domaine_ar, name_domaine_fr },
  useNew
) => {
  const db = await getDb(useNew);
  return await domaineClasseDao.getDomaineByValue(
    name_domaine_ar,
    name_domaine_fr,
    db
  );
};

module.exports = {
  deleteDomaineClasse,
  getDomainesClasse,
  updateDomaineClasse,
  createDomaineClasse,
  getDomaineByValue,
};
