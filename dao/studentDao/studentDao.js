const etudiantModel = require("../../model/EtudiantModel/EtudiantModel")

const createEudiant = async (etudiant) => {
  return await etudiantModel.create(etudiant);
};
const getEtudiantById = async (id) => {
  try {
    const etudiant = await etudiantModel.findById(id)
      .populate('etat_compte')
      .populate('type_inscription')
      .populate({
        path: 'groupe_classe',
        populate: [
          {
            path: 'niveau_classe',
            populate: {
              path: 'sections',
              populate: {
                path: 'departements',
                populate: {
                  path: 'sections'
                }
              }
            }
          },
          {
            path: 'departement'
          },
          {
            path: 'matieres'
          }
        ]
      });

    return etudiant;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

const getEtudiants = async () => {
  try {
    const etudiants = await etudiantModel.find()
      .populate('etat_compte')
      .populate('type_inscription')
      .populate({
        path: 'groupe_classe',
        populate: [
          {
            path: 'niveau_classe',
            populate: {
              path: 'sections',
              populate: {
                path: 'departements',
                populate: {
                  path: 'sections'
                }
              }
            }
          },
          {
            path: 'departement'
          },
          {
            path: 'matieres'
          }
        ]
      });

    return etudiants;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

const deleteEtudiant = async (id) => {
  return await etudiantModel.findByIdAndDelete(id);
};

const updateEtudiant= async (id, updateData) => {
  return await etudiantModel.findByIdAndUpdate(id, updateData, { new: true });
};


module.exports = {
 
    createEudiant,
    getEtudiantById,
    getEtudiants,
    deleteEtudiant,
    updateEtudiant
};