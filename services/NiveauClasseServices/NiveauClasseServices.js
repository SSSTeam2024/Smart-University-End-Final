const niveauClasseDao = require("../../dao/NiveauClasseDao/NiveauClasseDao");
const niveauModel = require("../../model/NiveauClasseModel/NiveauClasseModel");
const SectionClasse = require("../../model/SectionClasseModel/SectionClasseModel");

// const registerNiveauClasse = async (userData) => {
//   try {
//     const niveauClasse = await niveauClasseDao.createNiveauClasse(userData);
//     await Promise.all(
//       userData.sections.map(async (sectionId) => {
//         await SectionClasse.findByIdAndUpdate(sectionId, {
//           $push: { niveau_classe: niveauClasse._id },
//         });
//       })
//     );

//     await niveauClasse.populate("sections");

//     return niveauClasse;
//   } catch (error) {
//     console.error("Error in registering niveau classe:", error);
//     throw error;
//   }
// };

const registerNiveauClasse = async (userData) => {
  try {
    // Ensure sections is an array to prevent `.map()` from failing
    const sections = Array.isArray(userData.sections) ? userData.sections : [];

    // Create NiveauClasse
    const niveauClasse = await niveauClasseDao.createNiveauClasse(userData);

    // Update SectionClasse references only if sections exist
    if (sections.length > 0) {
      await Promise.all(
        sections.map(async (sectionId) => {
          await SectionClasse.findByIdAndUpdate(sectionId, {
            $push: { niveau_classe: niveauClasse._id },
          });
        })
      );
    }

    await niveauClasse.populate("sections");
    return niveauClasse;
  } catch (error) {
    console.error("Error in registering niveau classe:", error);
    throw error;
  }
};

const updateNiveauClasseDao = async (id, updateData) => {
  return await niveauClasseDao.updateNiveauClasse(id, updateData);
};

const getNiveauClasseDaoById = async (id) => {
  return await niveauClasseDao.getNiveauClasseById(id);
};

const getNiveauxClasseDao = async () => {
  const result = await niveauClasseDao.getNiveauxClasse();
  return result;
};

const deleteNiveauClasse = async (id) => {
  try {
    console.log(`Attempting to delete niveau classe with ID: ${id}`);
    const deletedNiveauClasse = await niveauClasseDao.deleteNiveauClasse(id);

    if (!deletedNiveauClasse) {
      console.log(`Niveau Classe with ID ${id} not found`);
      throw new Error("Niveau Classe not found");
    }

    console.log(`Niveau Classe with ID ${id} deleted successfully`);
    const updateResult = await SectionClasse.updateMany(
      { niveau_classe: id },
      { $pull: { niveau_classe: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.nModified === 0) {
      console.warn(
        `No sections were updated to remove the deleted niveau classe ID ${id}`
      );
    }

    return deletedNiveauClasse;
  } catch (error) {
    console.error("Error deleting niveau classe and updating sections:", error);
    throw error;
  }
};
// getSectionsByIdNiveau

async function getSectionsByIdNiveau(niveauClasseId) {
  try {
    return await niveauClasseDao.getSectionsByIdNiveau(niveauClasseId);
  } catch (error) {
    throw error;
  }
}

// getSectionsByIdNiveau

async function getCyclesByIdNiveau(niveauClasseId) {
  try {
    return await niveauClasseDao.getCyclesByIdNiveau(niveauClasseId);
  } catch (error) {
    throw error;
  }
}

const getNiveauByValue = async ({ name_niveau_ar, name_niveau_fr }) => {
  return await niveauClasseDao.getNiveauByValue(name_niveau_ar, name_niveau_fr);
};

module.exports = {
  deleteNiveauClasse,
  getNiveauxClasseDao,
  getNiveauClasseDaoById,
  registerNiveauClasse,
  updateNiveauClasseDao,
  getSectionsByIdNiveau,
  getCyclesByIdNiveau,
  getNiveauByValue,
};
