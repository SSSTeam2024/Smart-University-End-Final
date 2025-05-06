const typeSeanceSchema = require("../../model/TypeSeanceModel/TypeSeanceModel");

function getTypeSeanceModel(dbConnection) {
  return (
    dbConnection.models.TypeSeance ||
    dbConnection.model("TypeSeance", typeSeanceSchema)
  );
}

const createTypeSeance = async (typeSeance, dbName) => {
  try {
    const TypeSeanceModel = await getTypeSeanceModel(dbName);
    return await TypeSeanceModel.create(typeSeance);
  } catch (error) {
    console.error("Error creating type seance:", error);
    throw error;
  }
};
const getTypeSeances = async (dbName) => {
  const TypeSeanceModel = await getTypeSeanceModel(dbName);
  const result = await TypeSeanceModel.find();
  return result;
};
const updateTypeSeance = async (id, updateData, dbName) => {
  const TypeSeanceModel = await getTypeSeanceModel(dbName);
  return await TypeSeanceModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTypeSeance = async (id, dbName) => {
  const TypeSeanceModel = await getTypeSeanceModel(dbName);
  return await TypeSeanceModel.findByIdAndDelete(id);
};
module.exports = {
  createTypeSeance,
  getTypeSeances,
  updateTypeSeance,
  deleteTypeSeance,
};
