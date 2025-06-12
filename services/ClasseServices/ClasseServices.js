const classeDao = require("../../dao/ClasseDao/ClasseDao");
const Classe = require("../../model/ClasseModels/ClasseModels");
const Matiere = require("../../model/MatiereModel/MatiereModel");
const seanceService = require("../../services/SeanceServices/SeanceServices");
// const typeStageDao = require("../../dao/TypeStageDao/TypeStageDao");
const { getDb } = require("../../config/dbSwitcher");

const createClasse = async (classeData, useNew) => {
  try {
    const db = await getDb(useNew);
    const createdClasse = await Classe.create(classeData, db);
    const populatedClasse = await Classe.findById(createdClasse._id, db)
      .populate({
        path: "niveau_classe",
        populate: {
          path: "sections",
          model: "SectionClasse",
        },
      })
      .populate("departement")
      .populate("matieres");

    return populatedClasse;
  } catch (error) {
    console.error("Error creating classe:", error);
    throw error;
  }
};

const updateClasse = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await classeDao.updateClasse(id, updateData, db);
};

const getClasseById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await classeDao.getClasseById(id, db);
};

const getClasses = async (useNew) => {
  const db = await getDb(useNew);
  const result = await classeDao.getClasses(db);
  return result;
};

const deleteClasseById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    // Delete the classe by its ID
    const deletedClasse = await classeDao.deleteClasse(id, db);

    if (!deletedClasse) {
      throw new Error("Classe not found");
    }

    // Update the matieres to remove the deleted classe from the classes array
    const updateResult = await Matiere.updateMany(
      { classes: id },
      { $pull: { classes: id } }
    );

    if (updateResult.modifiedCount === 0) {
      console.warn(
        `No matieres were updated to remove the deleted classe ID ${id}`
      );
    }

    return deletedClasse;
  } catch (error) {
    console.error("Error deleting classe and updating matieres:", error);
    throw error;
  }
};

async function assignMatieresToClasse(classeId, matiereIds, useNew) {
  try {
    const db = await getDb(useNew);
    const updatedClasse = await classeDao.assignMatieresToClasse(
      classeId,
      matiereIds,
      db
    );
    const populatedClasse = await Classe.findById(classeId)
      .populate("matieres")
      .exec();

    return populatedClasse;
  } catch (error) {
    throw new Error(`Error assigning matieres to classe: ${error.message}`);
  }
}

async function getAssignedMatieres(classeId, useNew) {
  try {
    const db = await getDb(useNew);
    return await classeDao.getAssignedMatieres(classeId, db);
  } catch (error) {
    throw new Error(`Error fetching assigned matieres: ${error.message}`);
  }
}

const getClassesByTeacherId = async (idTeacher, semestre, useNew) => {
  // const db = await getDb(useNew);
  let sessions = await seanceService.getSeancesByTeacher(
    idTeacher,
    semestre,
    useNew
  );
  let classes = sessions.map((s) => s.classe);

  const uniqueClasses = classes.reduce((accumulator, current) => {
    // If the id is not already in the accumulator Set, add it
    if (!accumulator.some((item) => item._id === current._id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  return uniqueClasses;
};

const getClasseByValue = async ({ nom_classe_ar, nom_classe_fr }, useNew) => {
  const db = await getDb(useNew);
  return await classeDao.getClasseByValue(nom_classe_ar, nom_classe_fr, db);
};

const assignParcoursToClasse = async (
  classeId,
  parcoursId,
  semestres,
  useNew
) => {
  if (!classeId || !parcoursId || !semestres) {
    throw new Error("Classe ID, Parcours ID, and Semestres are required");
  }
  const db = await getDb(useNew);
  return await classeDao.assignParcoursToClasse(
    classeId,
    parcoursId,
    semestres,
    db
  );
};

const getClassesByNiveauId = async (niveauId, useNew) => {
  try {
    const db = await getDb(useNew);

    return await classeDao.getClassesByNiveauId(niveauId, db);
  } catch (error) {
    console.error(
      "Error while fetching classes by niveau id in services",
      error
    );
  }
};

module.exports = {
  createClasse,
  updateClasse,
  getClasseById,
  getClasses,
  deleteClasseById,
  assignMatieresToClasse,
  getAssignedMatieres,
  getClassesByTeacherId,
  getClasseByValue,
  assignParcoursToClasse,
  getClassesByNiveauId,
};
