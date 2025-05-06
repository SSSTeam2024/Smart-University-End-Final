const intervenantSchema = require("../../model/IntervenantBureauOrdre/IntervenantBureauOrdre");

function getIntervenantModel(dbConnection) {
  return (
    dbConnection.models.Intervenant ||
    dbConnection.model("Intervenant", intervenantSchema)
  );
}

const createIntervenant = async (intervenant, dbName) => {
  const Intervenant = await getIntervenantModel(dbName);
  return await Intervenant.create(intervenant);
};

const getIntervenants = async (dbName) => {
  const Intervenant = await getIntervenantModel(dbName);
  return await Intervenant.find();
};

const updateIntervenant = async (id, updateData, dbName) => {
  const Intervenant = await getIntervenantModel(dbName);
  return await Intervenant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteIntervenant = async (id, dbName) => {
  const Intervenant = await getIntervenantModel(dbName);
  return await Intervenant.findByIdAndDelete(id);
};

module.exports = {
  createIntervenant,
  getIntervenants,
  updateIntervenant,
  deleteIntervenant,
};
