const DatabasesNamesDao = require("../../dao/DatabasesNamesDao/DatabasesNamesDao");

const getAllDatabases = async () => {
  return await DatabasesNamesDao.getAllDatabases(db);
};

module.exports = {
  getAllDatabases,
};
