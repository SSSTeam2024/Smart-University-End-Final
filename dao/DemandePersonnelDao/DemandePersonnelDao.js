const DemandePersonnelSchema = require("../../model/DemandePersonnelModel/DemandePersonnelModel");

function getDemandePersonnelModel(dbConnection) {
  return (
    dbConnection.models.DemandePersonnel ||
    dbConnection.model("DemandePersonnel", DemandePersonnelSchema)
  );
}

const createDemandePersonnel = async (demandePersonnelData, dbName) => {
  const DemandePersonnel = await getDemandePersonnelModel(dbName);
  const demandePersonnel = new DemandePersonnel(demandePersonnelData);
  return demandePersonnel.save();
};

const getAllDemandePersonnels = async (dbName) => {
  const DemandePersonnel = await getDemandePersonnelModel(dbName);
  return DemandePersonnel.find()
    .populate({
      path: "personnelId",
      populate: [
        {
          path: "poste",
        },
        {
          path: "etat_compte",
        },
        {
          path: "grade",
        },
        {
          path: "service",
        },
        {
          path: "categorie",
        },
      ],
      options: { strictPopulate: false },
    })
    .populate("piece_demande");
};

const getDemandePersonnelById = async (id, dbName) => {
  const DemandePersonnel = await getDemandePersonnelModel(dbName);
  return DemandePersonnel.findById(id)
    .populate({
      path: "personnelId",
      populate: [
        {
          path: "service",
        },
        {
          path: "etat_compte",
        },
        {
          path: "poste",
        },
        {
          path: "grade",
        },
        {
          path: "categorie",
        },
      ],
      options: { strictPopulate: false },
    })
    .populate("piece_demande");
};

// const updateDemandePersonnel = async (id, updateData) => {
//   return DemandePersonnel.findByIdAndUpdate(id, updateData, { new: true }).populate('personnelId');
// };
const updateDemandePersonnel = async (id, updateData, dbName) => {
  const DemandePersonnel = await getDemandePersonnelModel(dbName);
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return DemandePersonnel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("personnelId")
    .exec();
};

const deleteDemandePersonnel = async (id, dbName) => {
  const DemandePersonnel = await getDemandePersonnelModel(dbName);
  return DemandePersonnel.findByIdAndDelete(id).populate("personnelId");
};

const deleteManyDemandePersonnel = async (dbName, ids) => {
  const demandePersonnelModel = await getDemandePersonnelModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await demandePersonnelModel.deleteMany(query);
};

const getDemandeByPersonnelId = async (id, dbName) => {
  try {
    const DemandePersonnel = await getDemandePersonnelModel(dbName);
    const demandes = await DemandePersonnel.find({
      personnelId: id,
    });
    return demandes;
  } catch (error) {
    console.error("Error while getting demande by personnel id in Dao ");
    throw error;
  }
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  deleteManyDemandePersonnel,
  getDemandeByPersonnelId,
};
