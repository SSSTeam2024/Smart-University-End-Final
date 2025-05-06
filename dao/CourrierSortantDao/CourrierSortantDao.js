const courrierSortantSchema = require("../../model/CourrierSortantModel/CourrierSortantModel");

function getCourrierSortantModel(dbConnection) {
  return (
    dbConnection.models.CourrierSortant ||
    dbConnection.model("CourrierSortant", courrierSortantSchema)
  );
}

const createCourrierSortant = async (courrierSortant, dbName) => {
  const CourrierSortant = await getCourrierSortantModel(dbName);
  return await CourrierSortant.create(courrierSortant);
};

const getCourrierSortants = async (dbName) => {
  const CourrierSortant = await getCourrierSortantModel(dbName);
  return await CourrierSortant.find()
    .populate("voie_envoi")
    .populate("destinataire");
};

const updateCourrierSortant = async (id, updateData, dbName) => {
  const CourrierSortant = await getCourrierSortantModel(dbName);
  return await CourrierSortant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCourrierSortant = async (id, dbName) => {
  const CourrierSortant = await getCourrierSortantModel(dbName);
  return await CourrierSortant.findByIdAndDelete(id);
};

module.exports = {
  createCourrierSortant,
  getCourrierSortants,
  updateCourrierSortant,
  deleteCourrierSortant,
};
