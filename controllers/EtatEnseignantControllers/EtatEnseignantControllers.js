const EtatEnseignantService = require("../../services/EtatEnseignantServices/EtatEnseignantServices");

const addEtatEnseignant = async (req, res) => {
  try {
    const { value_etat_enseignant, etat_ar, etat_fr } = req.body;

    const etatEnseignant = await EtatEnseignantService.registerEtatEnseignant({
        value_etat_enseignant,
      etat_ar,
      etat_fr,
    });
    res.json(etatEnseignant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) { 
      res.status(400).send('Value must be unique.');
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateEtatEnseignantById = async (req, res) => {
  try {
    const etatEnseignantId = req.params.id;
    const { value_etat_enseignant, etat_ar, etat_fr } = req.body;

    const updatedEtatEnseignant = await EtatEnseignantService.updateEtatEnseignantDao(etatEnseignantId, {
        value_etat_enseignant, etat_ar, etat_fr
    });

    if (!updatedEtatEnseignant) {
      return res.status(404).send("Etat Enseignant not found!");
    }
    res.json(updatedEtatEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtatEnseignantById = async (req, res) => {
  try {
    const etatEnseignantId = req.params.id;

    const getEtatEnseignant= await EtatEnseignantService.getEtatEnseignantDaoById(etatEnseignantId);

    if (!getEtatEnseignant) {
      return res.status(404).send("Etat Enseignant not found");
    }
    res.json(getEtatEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllEtatEnseignant = async (req, res) => {
  try {
    const etatEnseignants = await EtatEnseignantService.getEtatsEnseignantDao();
    res.json(etatEnseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEtatEnseignantById = async (req, res) => {
  try {
    const etatEnseignantId = req.params.id;

    const deletedEtatEnseignant = await EtatEnseignantService.deleteEtatEnseignantDao(etatEnseignantId);

    if (!deletedEtatEnseignant) {
      return res.status(404).send("Etat Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
// 

module.exports = {
  deleteEtatEnseignantById,
  getAllEtatEnseignant,
  getEtatEnseignantById,
  updateEtatEnseignantById,
  addEtatEnseignant


};