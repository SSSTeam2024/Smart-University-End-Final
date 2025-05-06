const PointageEnseignantServices = require("../../services/PointageEnseignantServices/PointageEnseignantServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addPointageEnseignant = async (req, res) => {
  try {
    const { id_enseignant, id_seance, date_pointage } = req.body;

    const pointage =
      await PointageEnseignantServices.createNewPointageEnseignant(
        {
          id_enseignant,
          id_seance,
          date_pointage,
        },
        useNewDb(req)
      );
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
        },
        useNewDb(req)
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
        pointageEnseignantId,
        useNewDb(req)
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
      await PointageEnseignantServices.getAllPointageEnseignant(useNewDb(req));
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
        pointageEnseignantId,
        useNewDb(req)
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
      await PointageEnseignantServices.getPointageByEnseignantId(
        enseignantId,
        useNewDb(req)
      );
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
