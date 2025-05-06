const niveauClasseDao = require("../../dao/NiveauClasseDao/NiveauClasseDao");
const sectionClasseSchema = require("../../model/SectionClasseModel/SectionClasseModel");
const { getDb } = require("../../config/dbSwitcher");

function getSectionClasseModel(dbConnection) {
  return (
    dbConnection.models.SectionClasse ||
    dbConnection.model("SectionClasse", sectionClasseSchema)
  );
}

const registerNiveauClasse = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const SectionClasse = await getSectionClasseModel(dbName);
    const sections = Array.isArray(userData.sections) ? userData.sections : [];
    const niveauClasse = await niveauClasseDao.createNiveauClasse(userData, db);
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

const updateNiveauClasseDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await niveauClasseDao.updateNiveauClasse(id, updateData, db);
};

const getNiveauClasseDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await niveauClasseDao.getNiveauClasseById(id, db);
};

const getNiveauxClasseDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await niveauClasseDao.getNiveauxClasse(db);
  return result;
};

const deleteNiveauClasse = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const SectionClasse = await getSectionClasseModel(dbName);
    const deletedNiveauClasse = await niveauClasseDao.deleteNiveauClasse(
      id,
      db
    );

    if (!deletedNiveauClasse) {
      throw new Error("Niveau Classe not found");
    }
    const updateResult = await SectionClasse.updateMany(
      { niveau_classe: id },
      { $pull: { niveau_classe: id } }
    );

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

async function getSectionsByIdNiveau(niveauClasseId, useNew) {
  try {
    const db = await getDb(useNew);
    return await niveauClasseDao.getSectionsByIdNiveau(niveauClasseId, db);
  } catch (error) {
    throw error;
  }
}

async function getCyclesByIdNiveau(niveauClasseId, useNew) {
  try {
    const db = await getDb(useNew);
    return await niveauClasseDao.getCyclesByIdNiveau(niveauClasseId, db);
  } catch (error) {
    throw error;
  }
}

const getNiveauByValue = async ({ name_niveau_ar, name_niveau_fr }, useNew) => {
  const db = await getDb(useNew);
  return await niveauClasseDao.getNiveauByValue(
    name_niveau_ar,
    name_niveau_fr,
    db
  );
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
