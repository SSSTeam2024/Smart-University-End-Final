const parcoursSchema = require("../../model/ParcoursModel/ParcoursModel");

function getParcoursModel(dbConnection) {
  return (
    dbConnection.models.Parcours ||
    dbConnection.model("Parcours", parcoursSchema)
  );
}

const createParcours = async (parcours, dbName) => {
  try {
    const Parcours = await getParcoursModel(dbName);
    return await Parcours.create(parcours);
  } catch (error) {
    throw error;
  }
};

const getAllParcours = async (dbName) => {
  try {
    const Parcours = await getParcoursModel(dbName);
    return await Parcours.find()
      .populate("domaine")
      .populate("type_parcours")
      .populate("mention")
      .populate({
        path: "modules",
        populate: { path: "matiere" },
      });
  } catch (error) {
    console.error("Error fetching parcours:", error);
    throw error;
  }
};

const updateParcours = async (id, updateData, dbName) => {
  try {
    const Parcours = await getParcoursModel(dbName);
    return await Parcours.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating parcours:", error);
    throw error;
  }
};

const deleteParcours = async (id, dbName) => {
  const Parcours = await getParcoursModel(dbName);
  return await Parcours.findByIdAndDelete(id);
};

const addModuleToParcours = async (parcoursId, moduleId, dbName) => {
  try {
    const Parcours = await getParcoursModel(dbName);
    return await Parcours.findByIdAndUpdate(
      parcoursId,
      { $push: { modules: moduleId } },
      { new: true } // Return the updated document
    );
  } catch (error) {
    throw error;
  }
};

const getParcoursByValue = async (nom_parcours, code_parcours, dbName) => {
  const Parcours = await getParcoursModel(dbName);
  return await Parcours.findOne({ nom_parcours, code_parcours });
};

const getSemestreByParcoursId = async (id, dbName) => {
  try {
    const Parcours = await getParcoursModel(dbName);
    const parcours = await Parcours.findById(id).select("semestre_parcours");
    return parcours ? parcours.semestre_parcours : null;
  } catch (error) {
    console.error("Error fetching semestre by parcours ID:", error);
    return null;
  }
};

module.exports = {
  createParcours,
  getAllParcours,
  updateParcours,
  deleteParcours,
  addModuleToParcours,
  getParcoursByValue,
  getSemestreByParcoursId,
};
