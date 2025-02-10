const gradeEnseignantService = require("../../services/GradeEnseignantServices/GradeEnseignantServices");

const addGradeEnseignant = async (req, res) => {
  try {
    const { grade_ar, grade_fr, charge_horaire } = req.body;

    const gradeEnseignant =
      await gradeEnseignantService.registerGradeEnseignant({
        grade_ar,
        grade_fr,
        charge_horaire,
      });
    res.json(gradeEnseignant);
  } catch (error) {
    console.error(error);
  }
};

const updateGradeEnseignantById = async (req, res) => {
  try {
    const gradeEnseignantId = req.params.id;
    const { grade_ar, grade_fr, charge_horaire } = req.body;

    const updatedGradeEnseignant =
      await gradeEnseignantService.updateGradeEnseignantDao(gradeEnseignantId, {
        grade_ar,
        grade_fr,
        charge_horaire,
      });

    if (!updatedGradeEnseignant) {
      return res.status(404).send("Grade Enseignant not found!");
    }
    res.json(updatedGradeEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getGradeEnseignantById = async (req, res) => {
  try {
    const gradeEnseignantId = req.params.id;

    const getGradeEnseignant =
      await gradeEnseignantService.getGradeEnseignantDaoById(gradeEnseignantId);

    if (!getGradeEnseignant) {
      return res.status(404).send("Grade Enseignant not found");
    }
    res.json(getGradeEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllGradeEnseignant = async (req, res) => {
  try {
    const gradeEnseignants =
      await gradeEnseignantService.getGradesEnseignantDao();
    res.json(gradeEnseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteGradeEnseignantById = async (req, res) => {
  try {
    const gradeEnseignantId = req.params.id;

    const deletedGradeEnseignant =
      await gradeEnseignantService.deleteGradeEnseignantDao(gradeEnseignantId);

    if (!deletedGradeEnseignant) {
      return res.status(404).send("Grade Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getGradeByValue = async (req, res) => {
  try {
    const { grade_fr, grade_ar } = req.body;

    if (!grade_fr || !grade_ar) {
      return res
        .status(400)
        .json({ message: "grade_fr and grade_ar are required" });
    }

    const gradeValue = await gradeEnseignantService.getGradeByValue({
      grade_fr,
      grade_ar,
    });

    if (!gradeValue) {
      return res.json(null);
    }

    res.json({
      id: gradeValue._id,
      grade_fr: gradeValue.grade_fr,
      grade_ar: gradeValue.grade_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteGradeEnseignantById,
  getAllGradeEnseignant,
  getGradeEnseignantById,
  updateGradeEnseignantById,
  addGradeEnseignant,
  getGradeByValue,
};
