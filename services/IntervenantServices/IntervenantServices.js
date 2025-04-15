const IntervenantDao = require("../../dao/IntervenantDao/IntervenantDao");

const createIntervenant = async (intervenant) => {
  return await IntervenantDao.createIntervenant(intervenant);
};

const updateIntervenant = async (id, updateData) => {
  return await IntervenantDao.updateIntervenant(id, updateData);
};

const getAllIntervenant = async () => {
  const result = await IntervenantDao.getIntervenants();
  return result;
};

const deleteIntervenant = async (id) => {
  return await IntervenantDao.deleteIntervenant(id);
};

module.exports = {
  createIntervenant,
  updateIntervenant,
  getAllIntervenant,
  deleteIntervenant,
};
