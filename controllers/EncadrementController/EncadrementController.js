const encadrementService = require("../../services/EncadrementServices/EncadrementServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

// CREATE
const createEncadrement = async (req, res) => {
  try {
    const {
      enseignant,
      etudiant,
      stage,
      seance,
      avancement,
      remarque,
      date,
      heure_debut,
      heure_fin,
      mode
    } = req.body;

    const encadrement = await encadrementService.createEncadrement(
      {
        enseignant,
        etudiant,
        stage,
        seance,
        avancement,
        remarque,
        date,
        heure_debut,
        heure_fin,
        mode
      },
      useNewDb(req)
    );

    res.status(201).json(encadrement);
  } catch (error) {
    console.error("Error creating Encadrement:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getAllEncadrements = async (req, res) => {
  try {
    const encadrements = await encadrementService.getAllEncadrements(useNewDb(req));
    res.status(200).json(encadrements);
  } catch (error) {
    console.error("Error fetching Encadrements:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getEncadrementById = async (req, res) => {
  try {
    const encadrement = await encadrementService.getEncadrementById(req.body._id, useNewDb(req));
    if (!encadrement) return res.status(404).json({ message: "Encadrement not found" });
    res.status(200).json(encadrement);
  } catch (error) {
    console.error("Error fetching Encadrement by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateEncadrement = async (req, res) => {
  try {
    const {
      _id,
      enseignant,
      etudiant,
      stage,
      seance,
      avancement,
      remarque,
      date,
      heure_debut,
      heure_fin,
      mode
    } = req.body;

    const updated = await encadrementService.updateEncadrement(
      _id,
      {
        enseignant,
        etudiant,
        stage,
        seance,
        avancement,
        remarque,
        date,
        heure_debut,
        heure_fin,
        mode
      },
      useNewDb(req)
    );

    if (!updated) return res.status(404).json({ message: "Encadrement not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating Encadrement:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteEncadrement = async (req, res) => {
  try {
    const deleted = await encadrementService.deleteEncadrement(req.body._id, useNewDb(req));
    if (!deleted) return res.status(404).json({ message: "Encadrement not found" });
    res.status(200).json({ message: "Encadrement deleted successfully" });
  } catch (error) {
    console.error("Error deleting Encadrement:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE MANY
const deleteManyEncadrements = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    const result = await encadrementService.deleteManyEncadrements(ids, useNewDb(req));

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No Encadrements found with provided IDs" });
    }

    res.status(200).json({ message: "Encadrements deleted successfully" });
  } catch (error) {
    console.error("Error deleting multiple Encadrements:", error);
    res.status(500).json({ message: error.message });
  }
};
const getGroupedEncadrementsByEnseignant = async (req, res) => {
  try {
    const enseignantId = req.body.enseignantId;
    const data = await encadrementService.getGroupedEncadrementsByEnseignant(
      enseignantId,
      useNewDb(req)
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching grouped encadrements:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEncadrement,
  getAllEncadrements,
  getEncadrementById,
  updateEncadrement,
  deleteEncadrement,
  deleteManyEncadrements,
  getGroupedEncadrementsByEnseignant
  
};
