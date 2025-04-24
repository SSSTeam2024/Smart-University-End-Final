const demandeEnseignantService = require('../../services/demandeEnseignantServices/demandeEnseignantServices');

const createDemandeEnseignant = async (req, res) => {
  try {
    const DemandeEnseignant = await demandeEnseignantService.createDemandeEnseignant(req.body);
    res.status(201).json(DemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDemandeEnseignants = async (req, res) => {
  try {
    const DemandeEnseignants = await demandeEnseignantService.getAllDemandeEnseignants();
    res.status(200).json(DemandeEnseignants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeEnseignantById = async (req, res) => {
  try {
    const DemandeEnseignant = await demandeEnseignantService.getDemandeEnseignantById(req.params.id);
    if (!DemandeEnseignant) {
      return res.status(404).json({ message: 'DemandeEnseignant not found' });
    }
    res.status(200).json(DemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemandeEnseignant = async (req, res) => {
  try {
    const updatedDemandeEnseignant = await demandeEnseignantService.updateDemandeEnseignant(req.body._id, req.body);
    if (!updatedDemandeEnseignant) {
      return res.status(404).json({ message: 'DemandeEnseignant not found' });
    }
    res.status(200).json(updatedDemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDemandeEnseignant = async (req, res) => {
  try {
    const deletedDemandeEnseignant = await demandeEnseignantService.deleteDemandeEnseignant(req.params.id);
    if (!deletedDemandeEnseignant) {
      return res.status(404).json({ message: 'DemandeEnseignant not found' });
    }
    res.status(200).json({ message: 'DemandeEnseignant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandesByTeacherId = async (req, res) => {
  try {
    const { enseignantId } = req.params;
    const demandes = await demandeEnseignantService.getDemandesByTeacherId(enseignantId);
    res.json(demandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching demandes by teacher ID" });
  }
};


module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId
};