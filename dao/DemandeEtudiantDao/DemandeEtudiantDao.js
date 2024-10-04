const DemandeEtudiant = require('../../model/DemandeEtudiantModel/DemandeEtudiantModel');


const createDemandeEtudiant = async (DemandeEtudiantData) => {
  const demandeEtudiant = new DemandeEtudiant(DemandeEtudiantData);
  return demandeEtudiant.save();
};

const getAllDemandeEtudiants = async () => {
  return DemandeEtudiant.find().populate({
    path: "studentId",
    populate: {
      path: "groupe_classe",
      populate: {
        path: "departement",
      },
    },
  }).populate("piece_demande")
};

const getDemandeEtudiantById = async (id) => {
  return DemandeEtudiant.findById(id).populate('studentId');
};

const updateDemandeEtudiant = async (id, updateData) => {
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return DemandeEtudiant.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('studentId')
    .exec();
};

const deleteDemandeEtudiant = async (id) => {
  return DemandeEtudiant.findByIdAndDelete(id).populate('studentId');
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant
};