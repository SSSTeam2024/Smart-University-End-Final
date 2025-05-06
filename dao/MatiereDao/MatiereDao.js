const matiereSchema = require("../../model/MatiereModel/MatiereModel");

function getMatiereModel(dbConnection) {
  return (
    dbConnection.models.Matiere || dbConnection.model("Matiere", matiereSchema)
  );
}

const createMatiere = async (matiere, dbName) => {
  try {
    const matiereModel = await getMatiereModel(dbName);
    return await matiereModel.create(matiere);
  } catch (error) {
    console.error("Error creating matiere:", error);
    throw error;
  }
};

const getMatieres = async (dbName) => {
  try {
    const matiereModel = await getMatiereModel(dbName);
    return await matiereModel.find().populate("classes");
  } catch (error) {
    console.error("Error fetching matieres:", error);
    throw error;
  }
};

const updateMatiere = async (id, updateData, dbName) => {
  try {
    const matiereModel = await getMatiereModel(dbName);
    return await matiereModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("classes");
  } catch (error) {
    console.error("Error updating matiere:", error);
    throw error;
  }
};

const deleteMatiere = async (id, dbName) => {
  try {
    const matiereModel = await getMatiereModel(dbName);
    return await matiereModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting matiere:", error);
    throw error;
  }
};

const getMatiereById = async (id, dbName) => {
  try {
    const matiereModel = await getMatiereModel(dbName);
    return await matiereModel.findById(id).populate("classes");
  } catch (error) {
    console.error("Error fetching matiere by ID:", error);
    throw error;
  }
};

const getMatiereByCodeMatiere = async (code_matiere, dbName) => {
  const matiereModel = await getMatiereModel(dbName);
  return await matiereModel.findOne({ code_matiere });
};

module.exports = {
  createMatiere,
  getMatieres,
  updateMatiere,
  deleteMatiere,
  getMatiereById,
  getMatiereByCodeMatiere,
};
