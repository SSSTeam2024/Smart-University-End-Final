const servicePersonnelDao = require("../../dao/ServicePersonnelDao/ServicePersonnelDao");
const { getDb } = require("../../config/dbSwitcher");

const registerServicePersonnel = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await servicePersonnelDao.createServicePersonnel(userData, db);
};

const updateServicePersonnelDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await servicePersonnelDao.updateServicePersonnel(id, updateData, db);
};

const getServicePersonnelDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await servicePersonnelDao.getServicePersonnelById(id, db);
};

const getServicesPersonnelDao = async (useNew) => {
  const db = await getDb(useNew);
  return await servicePersonnelDao.getServicesPersonnel(db);
};

const deleteServicePersonnelDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await servicePersonnelDao.deleteServicePersonnel(id, db);
};

const getServiceByValue = async ({ service_ar, service_fr }, useNew) => {
  const db = await getDb(useNew);
  return await servicePersonnelDao.getServiceByValue(
    service_ar,
    service_fr,
    db
  );
};

module.exports = {
  registerServicePersonnel,
  updateServicePersonnelDao,
  getServicePersonnelDaoById,
  deleteServicePersonnelDao,
  getServicesPersonnelDao,
  getServiceByValue,
};
