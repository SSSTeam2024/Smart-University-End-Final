const extraShortCodeDao = require("../../dao/ShortCodeDao/extraShortCodeDao");
const { getDb } = require("../../config/dbSwitcher");

const createExtraShortCode = async (extraShortCodeDataArray, useNew) => {
    const db = await getDb(useNew);
    return await extraShortCodeDao.createExtraShortCode(extraShortCodeDataArray, db);
};

const getExtraShortCodes = async (useNew) => {
    const db = await getDb(useNew);
    const result = await extraShortCodeDao.getExtraShortCodes(db);
    return result;
};

module.exports = {
    getExtraShortCodes,
    createExtraShortCode,
};
