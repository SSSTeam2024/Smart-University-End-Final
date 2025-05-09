const { connect } = require("../config/client");

const metdataService = require("../central/metadata");
const dbSwitcherService = require("../config/dbSwitcher");

async function cloneDatabaseForNewYear() {
  const client = await connect();
  const centralDb = client.db("interim_db");
  const databasesCol = centralDb.collection("databases");

  // Fetch current DB name
  const config = await databasesCol.findOne({});
  const sourceDbName = config.current;
  if (!sourceDbName)
    throw new Error("Current database is not set in central config.");

  // Generate new target DB name based on current year + 1
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + 1;
  const targetDbName = `db_${currentYear}-${targetYear}`;

  const sourceDb = client.db(sourceDbName);
  const targetDb = client.db(targetDbName);

  const collections = await sourceDb.listCollections().toArray();

  for (const { name } of collections) {
    const sourceCollection = sourceDb.collection(name);
    const targetCollection = targetDb.collection(name);

    const docs = await sourceCollection.find().toArray();
    if (docs.length) {
      await targetCollection.insertMany(docs);
    }
  }

  // Set the newly cloned DB as the "new" DB in the central registry
  await databasesCol.updateOne(
    {},
    { $set: { new: targetDbName, isMigrated: false } }
  );

  metdataService.setDbNewCache(targetDbName);
  metdataService.setDbMigrationCach(false);
  return {
    message: `Database ${sourceDbName} cloned to ${targetDbName} and set as 'new'`,
  };
}

async function promoteDatabase() {
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + 1;
  const targetDbName = `db_${currentYear}-${targetYear}`;

  const client = await connect();
  const centralDb = client.db("interim_db");
  const databasesNamesCol = centralDb.collection("databasesNames");

  databasesNamesCol.insertOne({
    name: targetDbName,
  });

  const databasesCol = centralDb.collection("databases");
  const config = await databasesCol.findOne({});
  const newDbName = config.new;
  // Allow promotion even if the database is newly created by the app
  await databasesCol.updateOne(
    {},
    {
      $set: { current: newDbName, new: null, isMigrated: true },
    }
  );

  metdataService.setDbNewCache("");
  metdataService.setDbCurrentCache(newDbName);
  metdataService.setDbMigrationCach(true);
  // metdataService.emptyCache();
  dbSwitcherService.updateDbConnectionCache();
  // dbSwitcherService.emptyConncache();
  return { message: `Promoted ${newDbName} as current database.` };
}

async function getDatabaseCache() {
  const isMegrateValue = metdataService.getDbCache();

  return isMegrateValue;
}

module.exports = {
  cloneDatabaseForNewYear,
  promoteDatabase,
  getDatabaseCache,
};
