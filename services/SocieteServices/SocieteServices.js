const SocieteDao = require("../../dao/SocieteDao/SocieteDao");
const { getDb } = require("../../config/dbSwitcher");

const createSociete = async (societeData, useNew) => {
  try {
    const db = await getDb(useNew);
    const societe = await SocieteDao.createSociete(societeData, db);

    return await societe;
  } catch (error) {
    console.error("Error creating new societe:", error);
    throw error;
  }
};

const getSocietes = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await SocieteDao.getSocietes(db);
    return result;
  } catch (error) {
    console.error("Error fetching societes:", error);
  }
};

module.exports = {
  getSocietes,
  createSociete,
};
