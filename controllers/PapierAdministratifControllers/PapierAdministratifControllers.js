const papierAdministratifService = require("../../services/PapierAdministrativeServices/PapierAdministrativeServices");

const addPapierAdministratif = async (req, res) => {
  try {
   
    const { nom_ar, nom_fr, category } = req.body;
    const papierAdministratif = await papierAdministratifService.addPapierAdministratif({
      nom_ar, nom_fr, category
    });

    res.json(papierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding Papier Administratif.' });
  }
};




const updatePapierAdministratiftById = async (req, res) => {
  try {
    const papierAdministratifId = req.params.id;
    const { files_papier_administratif} = req.body;

    const updatedPapierAdministratif = await papierAdministratifService.updatePapierAdministratif(papierAdministratifId, {
      files_papier_administratif
    });

    if (!updatedPapierAdministratif) {
      return res.status(404).send("Papier Administratif not found!");
    }
    res.json(updatedPapierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPapierAdministratifById = async (req, res) => {
  try {
    const papierAdministratifId = req.params.id;

    const papierAdministratif= await papierAdministratifService.getPapierAdministratifById(papierAdministratifId);

    if (!papierAdministratif) {
      return res.status(404).send("Papier Administratif not found");
    }
    res.json(papierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getPapierAdministratifs = async (req, res) => {
  try {
    const papierAdministratifs = await papierAdministratifService.gePapierAdministratifs();
    res.json(papierAdministratifs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePapierAdministratif = async (req, res) => {
  try {
    const papierAdministratifId = req.params.id;

    const papierAdministratif = await papierAdministratifService.deletePapierAdministratif(papierAdministratifId);

    if (!papierAdministratif) {
      return res.status(404).send("Papier Administratif not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


module.exports = {
    addPapierAdministratif,
    deletePapierAdministratif,
    getPapierAdministratifs,
    getPapierAdministratifById,
    updatePapierAdministratiftById
};