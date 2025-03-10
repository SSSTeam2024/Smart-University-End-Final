const categoriePersonnelDao = require("../../dao/CategoriePersonnelDao/CategoriePersonnelDao");

const registerCategoriePersonnel = async (userData) => {
  return await categoriePersonnelDao.createCategoriePersonnel(userData);
};

const updateCategoriePersonnelDao = async (id, updateData) => {
  return await categoriePersonnelDao.updateCategoriePersonnel(id, updateData);
};

const getCategoriePersonnelDaoById = async (id) => {
  return await categoriePersonnelDao.getCategoriePersonnelById(id);
};

const getCategoriesPersonnelDao = async () => {
  return await categoriePersonnelDao.getCategoriesPersonnel();
};

const deleteCategoriePersonnelDao = async (id) => {
  return await categoriePersonnelDao.deleteCategoriePersonnel(id);
};

const getCategoryByValue = async ({ categorie_ar, categorie_fr }) => {
  return await categoriePersonnelDao.getCategorieByValue(
    categorie_ar,
    categorie_fr
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
