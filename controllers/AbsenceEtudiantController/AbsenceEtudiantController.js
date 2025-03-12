const absenceEtudiantServices = require("../../services/AbsenceEtudiantServices/AbsenceEtudiantServices");

const addAbsenceEtudiant = async (req, res) => {
  try {
    const {
      classe,
      enseignant,
      etudiants,
      seance,
      departement,
      date,
      trimestre,
      added_by,
    } = req.body;
    console.log("req.body", req.body);
    const newAbsenceEtudiant =
      await absenceEtudiantServices.createAbsenceEtudiant({
        classe,
        enseignant,
        etudiants,
        seance,
        departement,
        date,
        trimestre,
        added_by,
      });
    res.json(newAbsenceEtudiant);
  } catch (error) {
    console.error(error);
  }
};

const updateAbsenceEtudiantById = async (req, res) => {
  try {
    const absenceEtudiantId = req.params.id;
    const {
      classe,
      enseignant,
      etudiants,
      seance,
      departement,
      date,
      trimestre,
      added_by,
    } = req.body;

    console.log(etudiants);

    const updatedAbsenceEtudiant =
      await absenceEtudiantServices.updateAbsenceEtudiant(absenceEtudiantId, {
        classe,
        enseignant,
        etudiants,
        seance,
        departement,
        date,
        trimestre,
        added_by,
      });

    if (!updatedAbsenceEtudiant) {
      return res.status(404).send("Absence Etudiant not found!");
    }
    res.json(updatedAbsenceEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAbsenceEtudiantById = async (req, res) => {
  try {
    const absenceEtudiantId = req.params.id;

    const getAbsenceEtudiant =
      await absenceEtudiantServices.getAbsenceEtudiantById(absenceEtudiantId);

    if (!getAbsenceEtudiant) {
      return res.status(404).send("Absence Etudiant not found");
    }
    res.json(getAbsenceEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllAbsenceEtudiant = async (req, res) => {
  try {
    const absenceEtudiants =
      await absenceEtudiantServices.getAbsenceEtudiants();
    res.json(absenceEtudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteAbsenceEtudiantById = async (req, res) => {
  try {
    const absenceEtudiantId = req.params.id;

    const deletedAbsenceEtudiant =
      await absenceEtudiantServices.deleteAbsenceEtudiant(absenceEtudiantId);

    if (!deletedAbsenceEtudiant) {
      return res.status(404).send("Absence Etudiant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllAbsenceClasse = async (req, res) => {
  try {
    const classId = req.params.id;
    let classAbsences = await absenceEtudiantServices.getAllAbsenceClasse(
      classId
    );
    res.json(classAbsences);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteAbsenceEtudiantById,
  getAllAbsenceEtudiant,
  getAbsenceEtudiantById,
  updateAbsenceEtudiantById,
  addAbsenceEtudiant,
  getAllAbsenceClasse,
};
