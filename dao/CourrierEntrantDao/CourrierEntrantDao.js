const courrierEntrantSchema = require("../../model/CourrierEntrantModel/CourrierEntrantModel");

function getCourrierEntrantModel(dbConnection) {
  return (
    dbConnection.models.CourrierEntrant ||
    dbConnection.model("CourrierEntrant", courrierEntrantSchema)
  );
}

const createCourrierEntrant = async (courrierEntrant, dbName) => {
  const CourrierEntrant = await getCourrierEntrantModel(dbName);
  return await CourrierEntrant.create(courrierEntrant);
};

const getCourrierEntrants = async (dbName) => {
  const CourrierEntrant = await getCourrierEntrantModel(dbName);
  return await CourrierEntrant.find()
    .populate("source")
    .populate("destinataire");
};

const getLastCourrierEntrant = async (dbName) => {
  const CourrierEntrant = await getCourrierEntrantModel(dbName);
  return await CourrierEntrant.findOne().sort({ createdAt: -1 });
};

const updateCourrierEntrant = async (id, updateData, dbName) => {
  const CourrierEntrant = await getCourrierEntrantModel(dbName);
  return await CourrierEntrant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCourrierEntrant = async (id, dbName) => {
  const CourrierEntrant = await getCourrierEntrantModel(dbName);
  return await CourrierEntrant.findByIdAndDelete(id);
};

module.exports = {
  createCourrierEntrant,
  getCourrierEntrants,
  updateCourrierEntrant,
  deleteCourrierEntrant,
  getLastCourrierEntrant,
};
