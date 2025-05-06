const { MongoClient } = require("mongodb");

const sourceUri = process.env.MONGO_URL;

const cloneDatabase = async (databaseName) => {
  const targetUri = process.env.MONGO_URL.replace(
    "Smart_University",
    databaseName
  );

  const sourceClient = new MongoClient(sourceUri);
  const targetClient = new MongoClient(targetUri);

  try {
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDb = sourceClient.db(); // default DB from URI
    const targetDb = targetClient.db(); // new DB

    const collections = await sourceDb.listCollections().toArray();

    for (const { name } of collections) {
      const sourceCol = sourceDb.collection(name);
      const targetCol = targetDb.collection(name);
      const docs = await sourceCol.find({}).toArray();

      // Optionally remove _id to avoid conflicts
      // const docsToInsert = docs.map(({ _id, ...rest }) => rest);
      if (docs.length > 0) await targetCol.insertMany(docs);
    }
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }

  return { success: true };
};

module.exports = { cloneDatabase };
