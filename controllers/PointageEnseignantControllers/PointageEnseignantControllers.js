const PointageEnseignantServices = require("../../services/PointageEnseignantServices/PointageEnseignantServices");

const addPointageEnseignant = async (req, res) => {
  try {
    const { id_enseignant, id_seance, date_pointage } = req.body;

    const pointage =
      await PointageEnseignantServices.createNewPointageEnseignant({
        id_enseignant,
        id_seance,
        date_pointage,
      });
    res.json(pointage);
  } catch (error) {
    console.error(error);
  }
};

const updatePointageEnseignant = async (req, res) => {
  try {
    const pointageEnseignantId = req.params.id;
    const { id_enseignant, id_seance, date_pointage } = req.body;

    const updatedPointageEnseignant =
      await PointageEnseignantServices.updatePointageEnseignant(
        pointageEnseignantId,
        {
          id_enseignant,
          id_seance,
          date_pointage,
        }
      );

    if (!updatedPointageEnseignant) {
      return res.status(404).send("Pointage Enseignant not found!");
    }
    res.json(updatedPointageEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPointageEnseignantById = async (req, res) => {
  try {
    const pointageEnseignantId = req.params.id;

    const getPointageEnseignant =
      await PointageEnseignantServices.getPointageEnseignantById(
        pointageEnseignantId
      );

    if (!getPointageEnseignant) {
      return res.status(404).send("Pointage Enseignant not found");
    }
    res.json(getPointageEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllPointageEnseignant = async (req, res) => {
  try {
    const pointageEnseignant =
      await PointageEnseignantServices.getAllPointageEnseignant();
    res.json(pointageEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCycleById = async (req, res) => {
  try {
    const pointageEnseignantId = req.params.id;

    const deletePointageEnseignant =
      await PointageEnseignantServices.deletePointageEnseignant(
        pointageEnseignantId
      );

    if (!deletePointageEnseignant) {
      return res.status(404).send("Pointage Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPointageByEnseignantId = async (req, res) => {
  try {
    const { id: enseignantId } = req.params;
    const pointages =
      await PointageEnseignantServices.getPointageByEnseignantId(enseignantId);
    res.json(pointages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addPointageEnseignant,
  updatePointageEnseignant,
  getPointageEnseignantById,
  getAllPointageEnseignant,
  deleteCycleById,
  getPointageByEnseignantId,
};
