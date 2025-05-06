const generatedDocDao = require("../../dao/GeneratedDocDao/GeneratedDocDao");
const { getDb } = require("../../config/dbSwitcher");

const saveGeneratedDoc = async (generatedDocData, useNew) => {
  const db = await getDb(useNew);
  return await generatedDocDao.saveGenerated(generatedDocData, db);
};

const getGeneratedDocsByModelId = async (model_id, useNew) => {
  const db = await getDb(useNew);
  return await generatedDocDao.getGenerartedDocsByModelId(model_id, db);
};
const getGenerartedDocsByQrCode = async (num_qr_code, useNew) => {
  const db = await getDb(useNew);
  return await generatedDocDao.getGenerartedDocsByQrCode(num_qr_code, db);
};

module.exports = {
  saveGeneratedDoc,
  getGeneratedDocsByModelId,
  getGenerartedDocsByQrCode,
};
