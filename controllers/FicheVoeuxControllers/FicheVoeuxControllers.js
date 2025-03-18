const ficheVoeuxService = require("../../services/FicheVoeuxServices/FicheVoeuxServices");

const addFicheVoeux = async (req, res) => {
  try {
    const { fiche_voeux_classes, enseignant, semestre, jours, remarque } = req.body;

    const fiche = await ficheVoeuxService.createficheVoeux({
      fiche_voeux_classes, enseignant, semestre, jours, remarque
    });
    res.json(fiche);
  } catch (error) {
    console.error(error);
  }
};

const updateFicheVoeuxById = async (req, res) => {
  try {
    const ficheVoeuxId = req.body._id;
    const { fiche_voeux_classes, jours, temps, classe,enseignant,semestre, remarque } = req.body;

    const updatedFicheVoeux= await ficheVoeuxService.updateFicheVoeux(ficheVoeuxId, {
      fiche_voeux_classes, jours, temps, classe,enseignant,semestre, remarque
    });

    if (!updatedFicheVoeux) {
      return res.status(404).send("Fiche Voeux not found!");
    }
    res.json(updatedFicheVoeux);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getFichesVoeux = async (req, res) => {
  try {
    const fichesVoeux = await ficheVoeuxService.getFichesVoeux();
    res.json(fichesVoeux);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteFicheVoeuxById = async (req, res) => {
  try {
    const ficheVoeuxId = req.params.id;

    const deletedFicheVoeux = await ficheVoeuxService.deleteFicheVoeuxById(ficheVoeuxId);

    if (!deletedFicheVoeux) {
      return res.status(404).send("Fiche Voeux not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


module.exports = {
  addFicheVoeux,
  getFichesVoeux,
  deleteFicheVoeuxById,
  updateFicheVoeuxById
};