const DatabasesNamesServices = require("../../services/DatabasesNamesServices/DatabasesNamesServices");

const getAllDatabases = async (req, res) => {
  try {
    const database = await DatabasesNamesServices.getAllDatabases();
    res.status(200).json(database);
  } catch (error) {
    console.error("Error fetching all Databases:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDatabases,
};
