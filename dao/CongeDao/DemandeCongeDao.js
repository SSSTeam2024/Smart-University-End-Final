const DemandeCongeSchema = require("../../model/CongéModels/demandeConge");

function getDemandeCongeModel(dbConnection) {
  return (
    dbConnection.models.DemandeConge ||
    dbConnection.model("DemandeConge", DemandeCongeSchema)
  );
}

const createDemandeConge = async (demandeCongeData, dbName) => {
  const DemandeConge = await getDemandeCongeModel(dbName);
  const demandeConge = new DemandeConge(demandeCongeData);
  return demandeConge.save();
};

const getAllDemandeConges = async (dbName) => {
  const DemandeConge = await getDemandeCongeModel(dbName);
  return DemandeConge.find()
    .populate({
      path: "personnelId",
      populate: [
        {
          path: "categorie",
          model: "CategoriePersonnel",
        },
        {
          path: "grade",
          model: "GradePersonnel",
        },
        {
          path: "poste",
          model: "PostePersonnel",
        },
        {
          path: "service",
          model: "ServicePersonnel",
        },
      ],
    })
    .populate("leaveType")
    .lean();
};

const getDemandeCongeById = async (id, dbName) => {
  const DemandeConge = await getDemandeCongeModel(dbName);
  return DemandeConge.findById(id);
};

const updateDemandeConge = async (id, updateData, dbName) => {
  const DemandeConge = await getDemandeCongeModel(dbName);
  return DemandeConge.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDemandeConge = async (id, dbName) => {
  const DemandeConge = await getDemandeCongeModel(dbName);
  return DemandeConge.findByIdAndDelete(id);
};

const getDemandeCongeByPersonnelId = async (id, dbName) => {
  try {
    const DemandeConge = await getDemandeCongeModel(dbName);
    const demandesConge = await DemandeConge.find({
      personnelId: id,
    });
    return demandesConge;
  } catch (error) {
    console.error("Error while getting demande conge by personnel id in Dao ");
    throw error;
  }
};

module.exports = {
  createDemandeConge,
  getAllDemandeConges,
  getDemandeCongeById,
  updateDemandeConge,
  deleteDemandeConge,
  getDemandeCongeByPersonnelId,
};
