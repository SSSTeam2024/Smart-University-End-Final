const DemandeEtudiantSchema = require("../../model/DemandeEtudiantModel/DemandeEtudiantModel");

function getDemandeEtudiantModel(dbConnection) {
  return (
    dbConnection.models.DemandeEtudiant ||
    dbConnection.model("DemandeEtudiant", DemandeEtudiantSchema)
  );
}

const createDemandeEtudiant = async (demandeEtudiantData, dbName) => {
  const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
  const demandeEtudiant = new DemandeEtudiant(demandeEtudiantData);
  await demandeEtudiant.save();
  return demandeEtudiant;
};

const getAllDemandeEtudiants = async (dbName) => {
  const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
  return DemandeEtudiant.find()
    .populate({
      path: "studentId",
      populate: [
        {
          path: "groupe_classe",
          populate: {
            path: "departement",
          },
        },
        {
          path: "etat_compte",
        },
        {
          path: "type_inscription",
        },
      ],
    })
    .populate("piece_demande")
    .populate("generated_doc")
    .populate("added_by");
};

const getDemandeEtudiantById = async (id, dbName) => {
  const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
  return await DemandeEtudiant.findById(id)
    .populate({
      path: "studentId",
      populate: [
        {
          path: "groupe_classe",
          populate: {
            path: "departement",
          },
        },
        {
          path: "etat_compte",
        },
        {
          path: "type_inscription",
        },
      ],
    })
    .populate("piece_demande");
};

const updateDemandeEtudiant = async (id, updateData, dbName) => {
  const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
  updateData.updatedAt = Date.now();

  return await DemandeEtudiant.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("studentId")
    .exec();
};

const deleteDemandeEtudiant = async (id, dbName) => {
  const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
  return DemandeEtudiant.findByIdAndDelete(id).populate("studentId");
};

const getDemandesByStudentId = async (studentId, dbName) => {
  try {
    const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
    return await DemandeEtudiant.find({ studentId })
      .populate("studentId")
      .populate("piece_demande")
      .populate("generated_doc");
  } catch (error) {
    console.error("Error fetching demandes by student ID:", error);
    throw error;
  }
};

const deleteManyDemandeEtudiants = async (dbName, ids) => {
  const demandeEtudiantModel = await getDemandeEtudiantModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await demandeEtudiantModel.deleteMany(query);
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant,
  getDemandesByStudentId,
  deleteManyDemandeEtudiants,
};
