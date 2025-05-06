const sectionClasseDao = require("../../dao/SectionClasseDao/SectionClasseDao");
const niveauClasseSchema = require("../../model/NiveauClasseModel/NiveauClasseModel");
const departementSchema = require("../../model/departementModel/DepartementModel");
const sectionClasseSchema = require("../../model/SectionClasseModel/SectionClasseModel");
const { getDb } = require("../../config/dbSwitcher");

function getDepartementModel(dbConnection) {
  return (
    dbConnection.models.Departement ||
    dbConnection.model("Departement", departementSchema)
  );
}

function getNiveauClasseModel(dbConnection) {
  return (
    dbConnection.models.NiveauClasse ||
    dbConnection.model("NiveauClasse", niveauClasseSchema)
  );
}

function getSectionClasseModel(dbConnection) {
  return (
    dbConnection.models.SectionClasse ||
    dbConnection.model("SectionClasse", sectionClasseSchema)
  );
}

const registerSectionClasse = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const sectionClasse = await sectionClasseDao.createSectionClasse(
      userData,
      db
    );
    await sectionClasseDao.updateDepartmentsWithSection(
      sectionClasse._id,
      userData.departements,
      db
    );
    await sectionClasse.populate("departements");
    return sectionClasse;
  } catch (error) {
    console.error("Error in registering section classe:", error);
    throw error;
  }
};

const updateSetionClasseDao = async (sectionClasseId, updateData, useNew) => {
  try {
    const db = await getDb(useNew);
    const SectionClasse = await getSectionClasseModel(dbName, db);
    const updatedSectionClasse = await SectionClasse.findByIdAndUpdate(
      sectionClasseId,
      updateData,
      { new: true }
    );

    // Clear old section references from departments
    const oldSection = await SectionClasse.findById(sectionClasseId);
    const DepartementClasse = await getDepartementModel(dbName, db);
    if (oldSection) {
      await Promise.all(
        oldSection.departements.map(async (departmentId) => {
          await DepartementClasse.findByIdAndUpdate(departmentId, {
            $pull: { sections: sectionClasseId },
          });
        })
      );
    }

    // Add new section references to departments
    await sectionClasseDao.updateDepartmentsWithSection(
      sectionClasseId,
      updateData.departements,
      db
    );

    return updatedSectionClasse;
  } catch (error) {
    console.error("Error in updating section classe:", error);
    throw error;
  }
};

const getSectionClasseDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await sectionClasseDao.getSectionClasseById(id, db);
};

const getSectionsClasseDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await sectionClasseDao.getSectionsClasse(db);
  return result;
};

const deleteSectionClassetDao = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const deletedSection = await sectionClasseDao.deleteSectionClasse(id, db);
    const niveauClasse = await getNiveauClasseModel(dbName, db);
    if (!deletedSection) {
      console.log(`Section with ID ${id} not found`);
      throw new Error("Section not found");
    }

    console.log(`Section with ID ${id} deleted successfully`);
    const updateResult = await niveauClasse.updateMany(
      { sections: id },
      { $pull: { sections: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.nModified === 0) {
      console.warn(
        `No niveau classes were updated to remove the deleted section ID ${id}`
      );
    }

    return deletedSection;
  } catch (error) {
    console.error("Error deleting section and updating niveau classes:", error);
    throw error;
  }
};

module.exports = {
  deleteSectionClassetDao,
  getSectionsClasseDao,
  getSectionClasseDaoById,
  updateSetionClasseDao,
  registerSectionClasse,
};
