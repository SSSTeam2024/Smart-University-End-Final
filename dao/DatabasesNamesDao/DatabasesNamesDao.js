const DatabaseNamesSchema = require("../../model/DatabasesNamesModel/DatabasesNamesModel");

const getAllDatabases = async () => {
  const databaseModel = await getDatabaseNamesModel();
  return await databaseModel.find();
};

module.exports = {
  getAllDatabases,
};
