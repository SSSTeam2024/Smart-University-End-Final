const {
  cloneDatabaseForNewYear,
  promoteDatabase,
  getDatabaseCache,
} = require("../../central/cloneManager");

async function cloneDb(req, res) {
  try {
    const result = await cloneDatabaseForNewYear();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function promoteDb(req, res) {
  try {
    const result = await promoteDatabase();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMigratedValue(req, res) {
  try {
    const result = await getDatabaseCache();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { cloneDb, promoteDb, getMigratedValue };
