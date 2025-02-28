const specialiteEnseignantService = require("../../services/SpecialiteEnseignantServices/SpecialiteEnseignantServices");

const addSpecialiteEnseignant = async (req, res) => {
  try {
    const { specialite_ar, specialite_fr } = req.body;

    const specialiteEnseignant =
      await specialiteEnseignantService.registerSpecialiteEnseignant({
        specialite_ar,
        specialite_fr,
      });
    res.json(specialiteEnseignant);
  } catch (error) {
    console.error(error);
  }
};

const updateSpecialiteEnseignantById = async (req, res) => {
  try {
    const specialiteEnseignantId = req.params.id;
    const { specialite_ar, specialite_fr } = req.body;

    const updatedSpecialiteEnseignant =
      await specialiteEnseignantService.updateSpecialiteEnseignantDao(
        specialiteEnseignantId,
        {
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
const getSpecialiteByValue = async (req, res) => {
  try {
    const { specialite_fr, specialite_ar } = req.body;

    if (!specialite_fr || !specialite_ar) {
      return res
        .status(400)
        .json({ message: "specialite_fr and specialite_ar are required" });
    }

    const specialiteValue =
      await specialiteEnseignantService.getSpecialiteByValue({
        specialite_fr,
        specialite_ar,
      });

    if (!specialiteValue) {
      return res.json(null);
    }

    res.json({
      id: specialiteValue._id,
      specialite_fr: specialiteValue.specialite_fr,
      specialite_ar: specialiteValue.specialite_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteSpecialiteEnseignantById,
  getAllSpecialiteEnseignant,
  getSpecialiteEnseignantById,
  updateSpecialiteEnseignantById,
  addSpecialiteEnseignant,
  getSpecialiteByValue,
};
