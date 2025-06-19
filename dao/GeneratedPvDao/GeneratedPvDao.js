const generatedPvSchema = require("../../model/GeneratedPvModel/GeneratedPvModel");

function getGeneratedPvModel(dbConnection) {
  return (
    dbConnection.models.GeneratedPv ||
    dbConnection.model("GeneratedPv", generatedPvSchema)
  );
}

const createGeneratedPv = async (generatedPv, dbName) => {
  try {
    const GeneratedPv = await getGeneratedPvModel(dbName);
    return await GeneratedPv.create(generatedPv);
  } catch (error) {
    console.error("create new Generated Pv in dao: ", error);
  }
};

const getGeneratedPvs = async (dbName) => {
  try {
    const GeneratedPv = await getGeneratedPvModel(dbName);
    return await GeneratedPv.find().populate("commission");
  } catch (error) {
    console.error("getting Generated Pvs in dao: ", error);
  }
};

const updateGeneratedPv = async (id, updateData, dbName) => {
  try {
    const GeneratedPv = await getGeneratedPvModel(dbName);
    return await GeneratedPv.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error("update Generated Pv in dao: ", error);
  }
};

const deleteGeneratedPv = async (id, dbName) => {
  try {
    const GeneratedPv = await getGeneratedPvModel(dbName);
    return await GeneratedPv.findByIdAndDelete(id);
  } catch (error) {
    console.error("delete Generated Pv in dao: ", error);
  }
};

module.exports = {
  createGeneratedPv,
  getGeneratedPvs,
  updateGeneratedPv,
  deleteGeneratedPv,
};
