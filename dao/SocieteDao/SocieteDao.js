const societeSchema = require("../../model/SocieteModel/SocieteModel");

function getSocieteModel(dbConnection) {
  return (
    dbConnection.models.Societe || dbConnection.model("Societe", societeSchema)
  );
}

const createSociete = async (societe, dbName) => {
  const societeModel = await getSocieteModel(dbName);
  return await societeModel.create(societe);
};

const getSocietes = async (dbName) => {
  const societeModel = await getSocieteModel(dbName);
  return await societeModel.find();
};

const getSocieteByName = async (name, dbName) => {
  try {
    const societeModel = await getSocieteModel(dbName);
    return await societeModel.findOne({
      nom: name,
    });
  } catch (error) {
    console.error("In dao getting societe by name !!", error.message);
  }
};

const getSocieteByid = async (id, dbName) => {
  try {
    const societeModel = await getSocieteModel(dbName);
    return await societeModel.findById(id);
  } catch (error) {
    console.error("In dao getting societe by id !!", error.message);
  }
};

const updateSociete = async (id, updateData, dbName) => {
  try {
    const societeModel = await getSocieteModel(dbName);
    return await societeModel.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error !! In dao update societe by id :", error.message);
  }
};

const deleteSociete = async (id, dbName) => {
  try {
    const societeModel = await getSocieteModel(dbName);
    return await societeModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error !! In dao delete societe by id :", error.message);
  }
};

module.exports = {
  getSocietes,
  createSociete,
  getSocieteByName,
  getSocieteByid,
  deleteSociete,
  updateSociete,
};
