const etudiantModel = require("../../model/EtudiantModel/EtudiantModel");

const createEudiant = async (etudiant) => {
  return await etudiantModel.create(etudiant);
};
const getEtudiantById = async (id) => {
  try {
    const etudiant = await etudiantModel
      .findById(id)
      .populate("etat_compte")
      .populate("type_inscription")
      .populate({
        path: "groupe_classe",
        populate: [
          {
            path: "niveau_classe",
            populate: {
              path: "sections",
              populate: {
                path: "departements",
                populate: {
                  path: "sections",
                },
              },
            },
          },
          {
            path: "departement",
          },
          {
            path: "matieres",
          },
        ],
      });

    return etudiant;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

const getEtudiants = async () => {
  try {
    const etudiants = await etudiantModel
      .find()
      .populate("etat_compte")
      .populate("type_inscription")
      .populate({
        path: "groupe_classe",
        populate: [
          {
            path: "niveau_classe",
            populate: {
              path: "sections",
              populate: {
                path: "departements",
                populate: {
                  path: "sections",
                },
              },
            },
          },
          {
            path: "departement",
          },
          {
            path: "matieres",
          },
        ],
      });

    return etudiants;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

const deleteEtudiant = async (id) => {
  return await etudiantModel.findByIdAndDelete(id);
};

const updateEtudiant = async (id, updateData) => {
  return await etudiantModel.findByIdAndUpdate(id, updateData, { new: true });
};

const updateGroupeClasse = async (studentIds, groupeClasseId) => {
  try {
    const result = await etudiantModel.updateMany(
      { _id: { $in: studentIds } },
      { $set: { groupe_classe: groupeClasseId } }
    );
    return result;
  } catch (error) {
    console.error("Error updating groupe_classe:", error);
    throw error;
  }
};

const getEtudiantsByIdClasse = async (classeId) => {
  try {
    const etudiants = await etudiantModel.find({
      groupe_classe: classeId,
    });
    return etudiants;
  } catch (error) {
    console.error("Error while getting studiants for this classe id");
    throw error;
  }
};
module.exports = {
  createEudiant,
  getEtudiantById,
  getEtudiants,
  deleteEtudiant,
  updateEtudiant,
  updateGroupeClasse,
  getEtudiantsByIdClasse,
};
