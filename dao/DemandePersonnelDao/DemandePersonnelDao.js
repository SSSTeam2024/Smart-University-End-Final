const DemandePersonnel = require('../../model/DemandePersonnelModel/DemandePersonnelModel');


const createDemandePersonnel = async (demandePersonnelData) => {
  const demandePersonnel = new DemandePersonnel(demandePersonnelData);
  return demandePersonnel.save();
};

const getAllDemandePersonnels = async () => {
  return DemandePersonnel.find()
    .populate({
      path: "personnelId",
      populate: [
        {
          path: "poste"
        },
        {
          path: "etat_compte"

        },
        {
          path: "grade"
        },
        {
          path: "service"
        },
        {
          path: "categorie"
        }
      ],
      options: { strictPopulate: false },
    })
    .populate("piece_demande");
};

const getDemandePersonnelById = async (id) => {
  return DemandePersonnel.findById(id)
    .populate({
      path: "personnelId",
      populate: [{
        path: "service",
      }, {
        path: "etat_compte",
      }, {
        path: "poste"
      }, {
        path: "grade"
      }, {
        path: "categorie"
      }],
      options: { strictPopulate: false },
    })
    .populate("piece_demande");
};

// const updateDemandePersonnel = async (id, updateData) => {
//   return DemandePersonnel.findByIdAndUpdate(id, updateData, { new: true }).populate('personnelId');
// };
const updateDemandePersonnel = async (id, updateData) => {
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return DemandePersonnel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('personnelId')
    .exec();
};


const deleteDemandePersonnel = async (id) => {
  return DemandePersonnel.findByIdAndDelete(id).populate('personnelId');
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel
};