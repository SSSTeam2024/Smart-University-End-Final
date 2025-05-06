const shortCodeSchema = require("../../model/ShortCodeModel/shortCodeModel");

function getShortCodeModel(dbConnection) {
  return (
    dbConnection.models.ShortCode ||
    dbConnection.model("ShortCode", shortCodeSchema)
  );
}

const createShortCode = async (shortCodes, dbName) => {
  const ShortCode = await getShortCodeModel(dbName);
  return await ShortCode.insertMany(shortCodes);
};

const getShortCodes = async (dbName) => {
  const ShortCode = await getShortCodeModel(dbName);
  return await ShortCode.find();
};

module.exports = {
  createShortCode,
  getShortCodes,
};
