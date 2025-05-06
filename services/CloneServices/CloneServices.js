const { cloneDatabase } = require("../../dao/CloneDao/CloneDao");

const cloneDbService = async (databaseName) => {
  return await cloneDatabase(databaseName);
};

module.exports = { cloneDbService };
