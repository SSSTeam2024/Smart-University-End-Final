const categoriePersonnelSchema = require("../../model/CategoriePersonnelModel/CategoriePersonnelModel");

function getCategoriePersonnelModel(dbConnection) {
  return (
    dbConnection.models.CategoriePersonnel ||
    dbConnection.model("CategoriePersonnel", categoriePersonnelSchema)
  );
}

const createCategoriePersonnel = async (categorie_personnel, dbName) => {
  const categoriePersonnel = await getCategoriePersonnelModel(dbName);
  return await categoriePersonnel.create(categorie_personnel);
};

const getCategoriesPersonnel = async (dbName) => {
  const categoriePersonnel = await getCategoriePersonnelModel(dbName);
  return await categoriePersonnel.find();
};

const updateCategoriePersonnel = async (id, updateData, dbName) => {
  const categoriePersonnel = await getCategoriePersonnelModel(dbName);
  return await categoriePersonnel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteCategoriePersonnel = async (id, dbName) => {
  const categoriePersonnel = await getCategoriePersonnelModel(dbName);
  return await categoriePersonnel.findByIdAndDelete(id);
};

const getCategoriePersonnelById = async (id, dbName) => {
  const categoriePersonnel = await getCategoriePersonnelModel(dbName);
  return await categoriePersonnel.findById(id);
};

const getCategorieByValue = async (categorie_ar, categorie_fr, dbName) => {
  const categoriePersonnel = await getCategoriePersonnelModel(dbName);
  return await categoriePersonnel.findOne({ categorie_ar, categorie_fr });
};

module.exports = {
  createCategoriePersonnel,
  getCategoriesPersonnel,
  updateCategoriePersonnel,
  deleteCategoriePersonnel,
  getCategoriePersonnelById,
  getCategorieByValue,
};
