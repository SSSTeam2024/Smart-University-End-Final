const Parcours = require("../../model/ParcoursModel/ParcoursModel");

const createParcours = async (parcours) => {
  try {
    return await Parcours.create(parcours);
  } catch (error) {
    throw error;
  }
};

const getAllParcours = async () => {
  try {
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

const updateParcours = async (id, updateData) => {
  try {
    return await Parcours.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating parcours:", error);
    throw error;
  }
};

const deleteParcours = async (id) => {
  return await Parcours.findByIdAndDelete(id);
};

const addModuleToParcours = async (parcoursId, moduleId) => {
  try {
    return await Parcours.findByIdAndUpdate(
      parcoursId,
      { $push: { modules: moduleId } },
      { new: true } // Return the updated document
    );
  } catch (error) {
    throw error;
  }
};

const getParcoursByValue = async (nom_parcours, code_parcours) => {
  return await Parcours.findOne({ nom_parcours, code_parcours });
};

const getSemestreByParcoursId = async (id) => {
  try {
    console.log("id dao", id);
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
