const specialiteEnseignantService = require("../../services/SpecialiteEnseignantServices/SpecialiteEnseignantServices");

const addSpecialiteEnseignant = async (req, res) => {
  try {
    const { value_specialite_enseignant, specialite_ar, specialite_fr } =
      req.body;

    const specialiteEnseignant =
      await specialiteEnseignantService.registerSpecialiteEnseignant({
        value_specialite_enseignant,
        specialite_ar,
        specialite_fr,
      });
    res.json(specialiteEnseignant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).send("Value must be unique.");
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateSpecialiteEnseignantById = async (req, res) => {
  try {
    const specialiteEnseignantId = req.params.id;
    const { value_specialite_enseignant, specialite_ar, specialite_fr } =
      req.body;

    const updatedSpecialiteEnseignant =
      await specialiteEnseignantService.updateSpecialiteEnseignantDao(
        specialiteEnseignantId,
        {
          value_specialite_enseignant,
          specialite_ar,
          specialite_fr,
        }
      );

    if (!updatedSpecialiteEnseignant) {
      return res.status(404).send("Specialite Enseignant not found!");
    }
    res.json(updatedSpecialiteEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSpecialiteEnseignantById = async (req, res) => {
  try {
    const specialiteEnseignantId = req.params.id;

    const getSpecialiteEnseignant =
      await specialiteEnseignantService.getSpecialiteEnseignantDaoById(
        specialiteEnseignantId
      );

    if (!getSpecialiteEnseignant) {
      return res.status(404).send("Etat Specialite not found");
    }
    res.json(getSpecialiteEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllSpecialiteEnseignant = async (req, res) => {
  try {
    const specialiteEnseignants =
      await specialiteEnseignantService.getSpecialitesEnseignantDao();
    res.json(specialiteEnseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSpecialiteEnseignantById = async (req, res) => {
  try {
    const specialiteEnseignantId = req.params.id;

    const deletedSpecialiteEnseignant =
      await specialiteEnseignantService.deleteSpecialiteEnseignantDao(
        specialiteEnseignantId
      );

    if (!deletedSpecialiteEnseignant) {
      return res.status(404).send("Specialite Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteSpecialiteEnseignantById,
  getAllSpecialiteEnseignant,
  getSpecialiteEnseignantById,
  updateSpecialiteEnseignantById,
  addSpecialiteEnseignant,
};