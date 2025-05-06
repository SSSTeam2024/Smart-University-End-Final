const categoriePersonnelDao = require("../../dao/CategoriePersonnelDao/CategoriePersonnelDao");
const { getDb } = require("../../config/dbSwitcher");

const registerCategoriePersonnel = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await categoriePersonnelDao.createCategoriePersonnel(userData, db);
};

const updateCategoriePersonnelDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await categoriePersonnelDao.updateCategoriePersonnel(
    id,
    updateData,
    db
  );
};

const getCategoriePersonnelDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await categoriePersonnelDao.getCategoriePersonnelById(id, db);
};

const getCategoriesPersonnelDao = async (useNew) => {
  const db = await getDb(useNew);
  return await categoriePersonnelDao.getCategoriesPersonnel(db);
};

const deleteCategoriePersonnelDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await categoriePersonnelDao.deleteCategoriePersonnel(id, db);
};

const getCategoryByValue = async ({ categorie_ar, categorie_fr }, useNew) => {
  const db = await getDb(useNew);
  return await categoriePersonnelDao.getCategorieByValue(
    categorie_ar,
    categorie_fr,
    db
  );
};

module.exports = {
  registerCategoriePersonnel,
  updateCategoriePersonnelDao,
  getCategoriePersonnelDaoById,
  getCategoriesPersonnelDao,
  deleteCategoriePersonnelDao,
  getCategoryByValue,
};
