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

// const updateSalle = async (id, updateData, dbName) => {
//   const salleModel = await getSalleModel(dbName);
//   return await salleModel.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteSalle = async (id, dbName) => {
//   const salleModel = await getSalleModel(dbName);
//   const DepartementModel = await getDepartementModel(dbName);
//   const deletedSalle = await salleModel.findByIdAndDelete(id);
//   if (deletedSalle) {
//     await DepartementModel.updateMany(
//       { salles: id },
//       { $pull: { salles: id } }
//     );
//   }
//   return deletedSalle;
// };

module.exports = {
  getSocietes,
  createSociete,
  getSocieteByName,
  //   updateSalle,
  //   deleteSalle,
  //   getSalleById,
};
