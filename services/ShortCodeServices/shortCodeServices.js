const shortCodeDao = require("../../dao/ShortCodeDao/shortCodeDao");
const { getDb } = require("../../config/dbSwitcher");

const createShortCode = async (shortCodeDataArray, useNew) => {
  const db = await getDb(useNew);
  return await shortCodeDao.createShortCode(shortCodeDataArray, db);
};

const getShortCodes = async (useNew) => {
  const db = await getDb(useNew);
  const result = await shortCodeDao.getShortCodes(db);
  return result;
};

module.exports = {
  createShortCode,
  getShortCodes,
};
