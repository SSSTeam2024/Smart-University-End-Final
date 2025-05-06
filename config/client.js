const { MongoClient } = require("mongodb");

const MONGO_URI =
  "mongodb+srv://smartuniversity3s:2V0nlgVluOQX6Dg0@cluster0.e3s3xpp.mongodb.net";

const client = new MongoClient(MONGO_URI);
let isConnected = false;

async function connect() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

module.exports = { connect, client };
