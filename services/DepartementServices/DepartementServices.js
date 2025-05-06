const departmentDao = require("../../dao/DepartementDao/DepartementDao");
const fs = require("fs");
const sectionClasseSchema = require("../../model/SectionClasseModel/SectionClasseModel");
const { getDb } = require("../../config/dbSwitcher");

function getSectionClasseModel(dbConnection) {
  return (
    dbConnection.models.SectionClasse ||
    dbConnection.model("SectionClasse", sectionClasseSchema)
  );
}

const registerDepartement = async (userData, documents, useNew) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    const db = await getDb(useNew);
    if (saveResult) {
      const newDepartement = await departmentDao.createDepartement(
        userData,
        db
      );
      return newDepartement;
    } else {
      throw new Error("Failed to save documents.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// function saveDocumentToServer
async function saveDocumentToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      console.log(file);
      await saveAdministrativeFile(file.base64String, file.name, file.path);
      counter++;
      console.log("File number " + counter + " saved");
    }
    return counter === documents.length;
  } catch (error) {
    console.error("Error saving documents:", error);
    return false;
  }
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, "base64");
    const fullFilePath = filePath + fileName;
    fs.writeFile(fullFilePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
        reject(err);
      } else {
        console.log("File saved successfully!");
        resolve();
      }
    });
  });
}

const updateDepartementDao = async (id, updateData, documents, useNew) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    const db = await getDb(useNew);
    if (saveResult) {
      const updatedDepartement = await departmentDao.updateDepartement(
        id,
        updateData,
        db
      );
      return updatedDepartement;
    } else {
      throw new Error("Failed to save documents.");
    }
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

const getDepartementDaoById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await departmentDao.getDepartementById(id, db);
  } catch (error) {
    console.error("Error fetching department by ID:", error);
    throw error;
  }
};

const getDepartementstDao = async (useNew) => {
  try {
    const db = await getDb(useNew);
    return await departmentDao.getDepartements(db);
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const deleteDepartementDao = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const deletedDepartment = await departmentDao.deleteDepartement(id, db);
    const sectionClasse = await getSectionClasseModel(dbName);
    if (!deletedDepartment) {
      throw new Error("Department not found");
    }

    const updateResult = await sectionClasse.updateMany(
      { departements: id },
      { $pull: { departements: id } }
    );

    if (updateResult.nModified === 0) {
      console.warn(
        `No Section classes were updated to remove the deleted department ID ${id}`
      );
    }

    return deletedDepartment;
  } catch (error) {
    console.error(
      "Error deleting departement and updating section classe:",
      error
    );
    throw error;
  }
};

module.exports = {
  deleteDepartementDao,
  getDepartementstDao,
  getDepartementDaoById,
  registerDepartement,
  updateDepartementDao,
};
