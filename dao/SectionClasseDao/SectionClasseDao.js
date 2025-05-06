const sectionClasseSchema = require("../../model/SectionClasseModel/SectionClasseModel");
const departementSchema = require("../../model/departementModel/DepartementModel");

function getSectionClasseModel(dbConnection) {
  return (
    dbConnection.models.SectionClasse ||
    dbConnection.model("SectionClasse", sectionClasseSchema)
  );
}

function getDepartementModel(dbConnection) {
  return (
    dbConnection.models.Departement ||
    dbConnection.model("Departement", departementSchema)
  );
}

const createSectionClasse = async (section, dbName) => {
  try {
    const sectionClasse = await getSectionClasseModel(dbName);
    return await sectionClasse.create(section);
  } catch (error) {
    throw error;
  }
};

const getSectionsClasse = async (dbName) => {
  try {
    const sectionClasse = await getSectionClasseModel(dbName);
    return await sectionClasse
      .find()
      .populate("niveau_classe")
      .populate("departements")
      .populate("mention_classe");
  } catch (error) {
    console.error("Error fetching niveaux classe:", error);
    throw error;
  }
};

const updateSectionClasse = async (id, updateData, dbName) => {
  try {
    const sectionClasse = await getSectionClasseModel(dbName);
    return await sectionClasse
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("niveau_classe")
      .populate("departements")
      .populate("mention_classe");
  } catch (error) {
    console.error("Error updating niveau classe:", error);
    throw error;
  }
};

const updateDepartmentsWithSection = async (
  sectionId,
  departmentIds,
  dbName
) => {
  try {
    const DepartementClasse = await getDepartementModel(dbName);
    await Promise.all(
      departmentIds.map(async (departmentId) => {
        await DepartementClasse.findByIdAndUpdate(departmentId, {
          $push: { sections: sectionId },
        });
      })
    );
  } catch (error) {
    throw error;
  }
};

const deleteSectionClasse = async (id, dbName) => {
  const sectionClasse = await getSectionClasseModel(dbName);
  return await sectionClasse.findByIdAndDelete(id);
};

const getSectionClasseById = async (id, dbName) => {
  try {
    const sectionClasse = await getSectionClasseModel(dbName);
    return await sectionClasse
      .findById(id)
      .populate("niveau_classe")
      .populate("departements")
      .populate("mention_classe");
  } catch (error) {
    console.error("Error fetching niveau classe by ID:", error);
    throw error;
  }
};

module.exports = {
  createSectionClasse,
  getSectionsClasse,
  updateSectionClasse,
  deleteSectionClasse,
  getSectionClasseById,
  updateDepartmentsWithSection,
};
