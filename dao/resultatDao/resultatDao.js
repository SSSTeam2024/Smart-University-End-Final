const resultatSchema = require("../../model/ResultatModel/ResultatModel");

function getResultatModel(dbConnection) {
  return (
    dbConnection.models.Resultat ||
    dbConnection.model("Resultat", resultatSchema)
  );
}

const createResultat = async (resultat, dbName) => {
  const resultatModel = await getResultatModel(dbName);
  return await resultatModel.create(resultat);
};

const getResultat = async (dbName) => {
  const resultatModel = await getResultatModel(dbName);
  return await resultatModel.find().populate({
    path: "etudiants",
    populate: { path: "etudiant" },
  });
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
// const getSalleById = async (id, dbName) => {
//   const salleModel = await getSalleModel(dbName);
//   return await salleModel.findById(id).populate("departement");
// };

module.exports = {
  getResultat,
  createResultat,
  //   updateSalle,
  //   deleteSalle,
  //   getSalleById,
};
