const EtatEnseignantService = require("../../services/EtatEnseignantServices/EtatEnseignantServices");

const addEtatEnseignant = async (req, res) => {
  try {
    const { etat_ar, etat_fr } = req.body;

    const etatEnseignant = await EtatEnseignantService.registerEtatEnseignant({
      etat_ar,
      etat_fr,
    });
    res.json(etatEnseignant);
  } catch (error) {
    console.log(error);
  }
};

const updateEtatEnseignantById = async (req, res) => {
  try {
    const etatEnseignantId = req.params.id;
    const { etat_ar, etat_fr } = req.body;

    const updatedEtatEnseignant =
      await EtatEnseignantService.updateEtatEnseignantDao(etatEnseignantId, {
        etat_ar,
        etat_fr,
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

    const getEtatEnseignant =
      await EtatEnseignantService.getEtatEnseignantDaoById(etatEnseignantId);

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

    const deletedEtatEnseignant =
      await EtatEnseignantService.deleteEtatEnseignantDao(etatEnseignantId);

    if (!deletedEtatEnseignant) {
      return res.status(404).send("Etat Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getEtatByValue = async (req, res) => {
  try {
    const { etat_fr, etat_ar } = req.body;
    console.log(req.body);
    if (!etat_fr || !etat_ar) {
      return res
        .status(400)
        .json({ message: "etat_fr and etat_ar are required" });
    }

    const etatValue = await EtatEnseignantService.getEtatCompteByValue({
      etat_fr,
      etat_ar,
    });

    if (!etatValue) {
      return res.json(null);
    }

    res.json({
      id: etatValue._id,
      etat_fr: etatValue.etat_fr,
      etat_ar: etatValue.etat_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteEtatEnseignantById,
  getAllEtatEnseignant,
  getEtatEnseignantById,
  updateEtatEnseignantById,
  addEtatEnseignant,
  getEtatByValue,
};
