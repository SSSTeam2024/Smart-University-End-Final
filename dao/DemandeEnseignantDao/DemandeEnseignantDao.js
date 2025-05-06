const DemandeEnseignant = require('../../model/DemandeEnseignantModel/DemandeEnseignantModel');


const createDemandeEnseignant = async (DemandeEnseignantData) => {
  const demandeEnseignant = new DemandeEnseignant(DemandeEnseignantData);
  return demandeEnseignant.save();
};

const getAllDemandeEnseignants = async () => {
  return DemandeEnseignant.find()
    .populate({
      path: "enseignantId",
      populate: [{
        path: "poste",
      }, {
        path: "etat_compte",
      }, {
        path: "specilaite"
      }, {
        path: "departements"
      }, {
        path: "grade"
      }],
      options: { strictPopulate: false },
    })
    .populate('piece_demande');
};

const getDemandeEnseignantById = async (id) => {
  return DemandeEnseignant.findById(id)
    .populate({
      path: "enseignantId",
      populate: [{
        path: "poste",
      }, {
        path: "etat_compte",
      }, {
        path: "specilaite"
      }, {
        path: "departements"
      }, {
        path: "grade"
      }],
      options: { strictPopulate: false },
    })
    .populate('piece_demande');
};

// const updateDemandeEnseignant = async (id, updateData) => {
//   return DemandeEnseignant.findByIdAndUpdate(id, updateData, { new: true }).populate('enseignantId').populate('piece_demande');
// };

const updateDemandeEnseignant = async (id, updateData) => {
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return DemandeEnseignant.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('enseignantId')
    .exec();
};

const deleteDemandeEnseignant = async (id) => {
  return DemandeEnseignant.findByIdAndDelete(id).populate('enseignantId');
};
const getDemandesByTeacherId = async (enseignantId) => {
  try {
    return await DemandeEnseignant.find({ enseignantId })
      .populate("enseignantId")
      .populate("piece_demande")
      .populate("generated_doc");
  } catch (error) {
    console.error("Error fetching demandes by teacher ID:", error);
    throw error;
  }
};
module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId
};