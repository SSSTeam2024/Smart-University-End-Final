const { connect, client } = require("../config/client");

let dbNamesCache = null;

async function getDatabaseNames() {
  console.log(dbNamesCache);
  if (dbNamesCache) return dbNamesCache;

  await connect();
  const centralDb = client.db("interim_db");
  const doc = await centralDb.collection("databases").findOne({});
  if (!doc) {
    throw new Error("central.databases is missing info or empty");
  }

  dbNamesCache = {
    current: doc.current,
    new: doc.new,
    isMigrated: doc.isMigrated,
  };
  return dbNamesCache;
}

function setDbNewCache(newDbValue) {
  dbNamesCache.new = newDbValue;
}

function setDbCurrentCache(currentDbValue) {
  dbNamesCache.current = currentDbValue;
}

function setDbMigrationCach(isMigratedDbValue) {
  dbNamesCache.isMigrated = isMigratedDbValue;
}

function emptyCache() {
  dbNamesCache = null;
}

function getDbCache() {
  return dbNamesCache.isMigrated;
}

module.exports = {
  getDatabaseNames,
  setDbNewCache,
  setDbCurrentCache,
  getDbCache,
  setDbMigrationCach,
  emptyCache,
};
