const DemandeEnseignantSchema = require("../../model/DemandeEnseignantModel/DemandeEnseignantModel");

function getDemandeEnseignantModel(dbConnection) {
  return (
    dbConnection.models.DemandeEnseignant ||
    dbConnection.model("DemandeEnseignant", DemandeEnseignantSchema)
  );
}

const createDemandeEnseignant = async (DemandeEnseignantData, dbName) => {
  const DemandeEnseignant = await getDemandeEnseignantModel(dbName);
  const demandeEnseignant = new DemandeEnseignant(DemandeEnseignantData);
  return demandeEnseignant.save();
};

const getAllDemandeEnseignants = async (dbName) => {
  const DemandeEnseignant = await getDemandeEnseignantModel(dbName);
  return DemandeEnseignant.find()
    .populate({
      path: "enseignantId",
      populate: [
        {
          path: "poste",
        },
        {
          path: "etat_compte",
        },
        {
          path: "specilaite",
        },
        {
          path: "departements",
        },
        {
          path: "grade",
        },
      ],
      options: { strictPopulate: false },
    })
    .populate("piece_demande");
};

const getDemandeEnseignantById = async (id, dbName) => {
  const DemandeEnseignant = await getDemandeEnseignantModel(dbName);
  return DemandeEnseignant.findById(id)
    .populate({
      path: "enseignantId",
      populate: [
        {
          path: "poste",
        },
        {
          path: "etat_compte",
        },
        {
          path: "specilaite",
        },
        {
          path: "departements",
        },
        {
          path: "grade",
        },
      ],
      options: { strictPopulate: false },
    })
    .populate("piece_demande");
};

// const updateDemandeEnseignant = async (id, updateData) => {
//   return DemandeEnseignant.findByIdAndUpdate(id, updateData, { new: true }).populate('enseignantId').populate('piece_demande');
// };

const updateDemandeEnseignant = async (id, updateData, dbName) => {
  const DemandeEnseignant = await getDemandeEnseignantModel(dbName);
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return DemandeEnseignant.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("enseignantId")
    .exec();
};

const deleteDemandeEnseignant = async (id, dbName) => {
  const DemandeEnseignant = await getDemandeEnseignantModel(dbName);
  return DemandeEnseignant.findByIdAndDelete(id).populate("enseignantId");
};

const getDemandesByTeacherId = async (enseignantId, dbName) => {
  try {
    const DemandeEnseignant = await getDemandeEnseignantModel(dbName);
    return await DemandeEnseignant.find({ enseignantId })
      .populate("enseignantId")
      .populate("piece_demande")
      .populate("generated_doc");
  } catch (error) {
    console.error("Error fetching demandes by teacher ID:", error);
    throw error;
  }
};

const deleteManyDemandeEnseignants = async (dbName, ids) => {
  const demandeEnseignantsModel = await getDemandeEnseignantModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await demandeEnseignantsModel.deleteMany(query);
};

module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId,
  deleteManyDemandeEnseignants,
};
