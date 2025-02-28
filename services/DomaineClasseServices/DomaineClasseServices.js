const domaineClasseDao = require("../../dao/DomaineClasseDao/DomaineClasseDao");

const createDomaineClasse = async (userData) => {
  try {
    const domaineClasse = await domaineClasseDao.createDomaineClasse(userData);

    return domaineClasse;
  } catch (error) {
    console.error("Error in registering domaine classe:", error);
    throw error;
  }
};

const updateDomaineClasse = async (id, updateData) => {
  return await domaineClasseDao.updateDomaineClasse(id, updateData);
};

const getDomainesClasse = async () => {
  return await domaineClasseDao.getDomainesClasse();
};

const deleteDomaineClasse = async (id) => {
  return await domaineClasseDao.deleteDomaineClasse(id);
};

const getDomaineByValue = async ({ name_domaine_ar, name_domaine_fr }) => {
  return await domaineClasseDao.getDomaineByValue(
    name_domaine_ar,
    name_domaine_fr
  );
};

module.exports = {
  deleteDomaineClasse,
  getDomainesClasse,
  updateDomaineClasse,
  createDomaineClasse,
  getDomaineByValue,
};
