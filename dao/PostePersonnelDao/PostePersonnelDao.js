const postePersonnelSchema = require("../../model/PostePersonnelModel/PostePersonnelModel");

function getPostePersonnelModel(dbConnection) {
  return (
    dbConnection.models.PostePersonnel ||
    dbConnection.model("PostePersonnel", postePersonnelSchema)
  );
}

const createPostePersonnel = async (poste_personnel, dbName) => {
  const postePersonnel = await getPostePersonnelModel(dbName);
  return await postePersonnel.create(poste_personnel);
};

const getPostesPersonnel = async (dbName) => {
  const postePersonnel = await getPostePersonnelModel(dbName);
  return await postePersonnel.find();
};

const updatePostePersonnel = async (id, updateData, dbName) => {
  const postePersonnel = await getPostePersonnelModel(dbName);
  return await postePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePostePersonnel = async (id, dbName) => {
  const postePersonnel = await getPostePersonnelModel(dbName);
  return await postePersonnel.findByIdAndDelete(id);
};

const getPostePersonnelById = async (id, dbName) => {
  const postePersonnel = await getPostePersonnelModel(dbName);
  return await postePersonnel.findById(id);
};

const getPosteByValue = async (poste_ar, poste_fr, dbName) => {
  const postePersonnel = await getPostePersonnelModel(dbName);
  return await postePersonnel.findOne({ poste_ar, poste_fr });
};

module.exports = {
  createPostePersonnel,
  getPostesPersonnel,
  updatePostePersonnel,
  deletePostePersonnel,
  getPostePersonnelById,
  getPosteByValue,
};
