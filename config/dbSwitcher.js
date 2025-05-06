const mongoose = require("mongoose");
const { registerModels } = require("./registerModels");
const { getDatabaseNames } = require("../central/metadata");

let connCache = {
  current: null,
  new: null,
};

async function getDb(useNew = false) {
  const { current, new: newDb } = await getDatabaseNames();
  const dbName = useNew ? newDb : current;

  if (connCache[useNew ? "new" : "current"]) {
    return connCache[useNew ? "new" : "current"];
  }

  const uri = `${process.env.MONGO_URL}/${dbName}`;
  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  registerModels(conn);
  connCache[useNew ? "new" : "current"] = conn;
  return conn;
}

function updateDbConnectionCache() {
  connCache["current"] = connCache["new"];
  connCache["new"] = null;
}

function emptyConncache() {
  connCache = {
    current: null,
    new: null,
  };
}

module.exports = { getDb, updateDbConnectionCache, emptyConncache };
