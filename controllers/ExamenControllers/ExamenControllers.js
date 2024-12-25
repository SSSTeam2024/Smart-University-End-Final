const examenService = require("../../services/ExamenServices/ExamenServices");

const createExamen = async (req, res) => {
  try {
    const {
      annee_universitaire,
      semestre,
      session,
      type_examen,
      period,
      group_enseignant,
      epreuve,
    } = req.body;

    const examen = await examenService.createExamen({
      annee_universitaire,
      semestre,
      session,
      type_examen,
      period,
      group_enseignant,
      epreuve,
    });
    res.json(examen);
  } catch (error) {
    console.error(error);
  }
};

const updateExamenById = async (req, res) => {
  try {
    const examenId = req.params.id;
    const {
      annee_universitaire,
      semestre,
      session,
      type_examen,
      period,
      enseignant,
      epreuve,
    } = req.body;

    const updatedExamen = await examenService.updateExamen(examenId, {
      annee_universitaire,
      semestre,
      session,
      type_examen,
      period,
      enseignant,
      epreuve,
    });

    if (!updatedExamen) {
      return res.status(404).send("Examen not found!");
    }
    res.json(updatedExamen);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getExamenById = async (req, res) => {
  try {
    const examenId = req.params.id;

    const getExamen = await examenService.getExamenById(examenId);

    if (!getExamen) {
      return res.status(404).send("Examen not found");
    }
    res.json(getExamen);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getExamens = async (req, res) => {
  try {
    const examens = await examenService.getAllExamens();
    res.json(examens);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteExamenById = async (req, res) => {
  try {
    const examenId = req.params.id;

    const deletedExamen = await examenService.deleteExamen(examenId);

    if (!deletedExamen) {
      return res.status(404).send("Examen not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteExamenById,
  getExamens,
  getExamenById,
  updateExamenById,
  createExamen,
};
