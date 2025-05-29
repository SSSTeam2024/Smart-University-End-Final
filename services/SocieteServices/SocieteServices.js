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

const getSocieteByName = async (name, useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await SocieteDao.getSocieteByName(name, db);
    return result;
  } catch (error) {
    console.error("Error fetching societe by name in services", error.message);
  }
};

const getSocieteById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await SocieteDao.getSocieteByid(id, db);
    return result;
  } catch (error) {
    console.error("Error fetching societe by id in services", error.message);
  }
};

module.exports = {
  getSocietes,
  createSociete,
  getSocieteByName,
  getSocieteById,
};
