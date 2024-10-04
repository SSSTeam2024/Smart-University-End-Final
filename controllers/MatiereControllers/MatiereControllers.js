const matiereService = require("../../services/MatiereServices/MatiereServices");

const addMatiere = async (req, res) => {
  try {
    const { code_matiere, matiere, type, semestre, volume, nbr_elimination } = req.body;

    const matiereJson = await matiereService.registerMatiere({
        code_matiere, matiere, type, semestre, volume, nbr_elimination 
    });
    res.json(matiereJson);
  } catch (error) {
    console.error(error);
  }
};

const updateMatiereById = async (req, res) => {
  try {
    const matiereId = req.params.id;
    const { code_matiere, matiere, type, semestre, volume, nbr_elimination } = req.body;

    const updatedMatiere= await matiereService.updateMatiereDao(matiereId, {
        code_matiere, matiere, type, semestre, volume, nbr_elimination
    });

    if (!updatedMatiere) {
      return res.status(404).send("Matiere not found!");
    }
    res.json(updatedMatiere);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMatiereById = async (req, res) => {
  try {
    const matiereId = req.params.id;

    const getMatiere= await matiereService.getMatiereDaoById(matiereId);

    if (!getMatiere) {
      return res.status(404).send("Matiere not found");
    }
    res.json(getMatiere);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllMatieres = async (req, res) => {
  try {
    const matieres = await matiereService.getMatieresDao();
    res.json(matieres);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteMatiereById = async (req, res) => {
  try {
    const matiereId = req.params.id;

    const deletedMatiere = await matiereService.deleteMatiereDao(matiereId);

    if (!deletedMatiere) {
      return res.status(404).send("Matiere not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
// 

module.exports = {
    deleteMatiereById,
    getAllMatieres,
    getMatiereById,
    updateMatiereById,
    addMatiere


};