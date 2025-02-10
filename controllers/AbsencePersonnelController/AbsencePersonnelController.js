const absencePersonnelService = require('../../services/AbsencePersonnelServices/AbsencePersonnelServices');


const addAbsencePersonnel = async (req, res) => {
  try {
    const { personnel, jour, seance, status } = req.body;

    const absencePersonnel = await absencePersonnelService.createAbsencePersonnel({
      personnel,
      jour,
      seance,
      status,
    });
    res.json(absencePersonnel);
  } catch (error) {
    console.error(error);
  }
};
const getAllAbsencesPersonnels = async (req, res) => {
  try {
    const absencePersonnel = await absencePersonnelService.getAllAbsencesPersonnels();
    res.status(200).json(absencePersonnel);
  } catch (error) {
    console.error("Error fetching all absencePersonnel", error);
    res.status(500).json({ message: error.message });
  }
};

const getAbsencePersonnelById = async (req, res) => {
  try {
    const absencePersonnel = await absencePersonnelService.getAbsencePersonnelById(req.body._id);
    if (!absencePersonnel) {
      return res.status(404).json({ message: 'absencePersonnel not found' });
    }
    res.status(200).json(absencePersonnel);
  } catch (error) {
    console.error("Error fetching AbsencePersonnel by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAbsencePersonnelById = async (req, res) => {
  try {
    const absencePersonnelId = req.body._id;
    const {  personnel, jour, seance, status } = req.body;

    const updatedAbsencePersonnel = await absencePersonnelService.updateAbsencePersonnel(absencePersonnelId, {
      personnel,
      jour,
      seance,
      status
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
    const deletedAbsencePersonnel = await absencePersonnelService.deleteAbsencePersonnel(req.body._id);
    if (!deletedAbsencePersonnel) {
      return res.status(404).json({ message: 'absence Personnel not found' });
    }
    res.status(200).json({ message: 'absence Personnel deleted successfully' });
  } catch (error) {
    console.error("Error deleting absence Personnel", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAbsencePersonnel,
  getAllAbsencesPersonnels,
  getAbsencePersonnelById,
  updateAbsencePersonnelById,
  deleteAbsencePersonnel
};
