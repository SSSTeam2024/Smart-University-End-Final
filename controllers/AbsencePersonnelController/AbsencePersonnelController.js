const absencePersonnelService = require("../../services/AbsencePersonnelServices/AbsencePersonnelServices");

const addAbsencePersonnel = async (req, res) => {
  try {
    const { personnels, jour, added_by } = req.body;

    const absencePersonnel =
      await absencePersonnelService.createAbsencePersonnel({
        personnels,
        jour,
        added_by,
      });
    res.json(absencePersonnel);
  } catch (error) {
    console.error(error);
  }
};
const getAllAbsencesPersonnels = async (req, res) => {
  try {
    const absencePersonnel =
      await absencePersonnelService.getAllAbsencesPersonnels();
    res.status(200).json(absencePersonnel);
  } catch (error) {
    console.error("Error fetching all absencePersonnel", error);
    res.status(500).json({ message: error.message });
  }
};

const getAbsencePersonnelById = async (req, res) => {
  try {
    const absencePersonnel =
      await absencePersonnelService.getAbsencePersonnelById(req.body._id);
    if (!absencePersonnel) {
      return res.status(404).json({ message: "absence Personnel not found" });
    }
    res.status(200).json(absencePersonnel);
  } catch (error) {
    console.error("Error fetching Absence Personnel by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAbsencePersonnelById = async (req, res) => {
  try {
    const absencePersonnelId = req.body._id;
    const { personnels, jour, added_by } = req.body;

    const updatedAbsencePersonnel =
      await absencePersonnelService.updateAbsencePersonnel(absencePersonnelId, {
        personnels,
        jour,
        added_by,
      });

    if (!updatedAbsencePersonnel) {
      return res.status(404).send("Absence Personnel not found!");
    }
    res.json(updatedAbsencePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteAbsencePersonnel = async (req, res) => {
  try {
    const absencePersonnelId = req.params.id;

    const deletedAbsencePersonnel =
      await absencePersonnelService.deleteAbsencePersonnel(absencePersonnelId);

    if (!deletedAbsencePersonnel) {
      return res.status(404).send("Absence Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addAbsencePersonnel,
  getAllAbsencesPersonnels,
  getAbsencePersonnelById,
  updateAbsencePersonnelById,
  deleteAbsencePersonnel,
};
