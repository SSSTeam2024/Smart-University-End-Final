const rattrapageService = require("../../services/RattrapageServices/RattrapageServices");

const createRattrapage = async (req, res) => {
  try {
    const {
      matiere,
      enseignant,
      classe,
      salle,
      jour,
      date,
      heure_debut,
      heure_fin,
      semestre,
      etat,
      status,
    } = req.body;

    const rattrapageJson = await rattrapageService.createRattrapage({
      matiere,
      enseignant,
      classe,
      salle,
      jour,
      date,
      heure_debut,
      heure_fin,
      semestre,
      etat,
      status,
    });
    res.json(rattrapageJson);
  } catch (error) {
    console.error(error);
  }
};

const getRattrapages = async (req, res) => {
  try {
    const rattrapages = await rattrapageService.getRattrapages();
    res.json(rattrapages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateRattrapageEtatStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { etat, status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Rattrapage ID is required." });
    }

    const updatedRattrapage =
      await rattrapageService.updateRattrapageEtatStatusService(
        id,
        etat,
        status
      );

    if (!updatedRattrapage) {
      return res.status(404).json({ message: "Rattrapage not found." });
    }

    res.status(200).json({
      message: "Rattrapage updated successfully.",
      rattrapage: updatedRattrapage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const deleteTypeSeance = async (req, res) => {
//   try {
//     const typeSeanceId = req.params.id;

//     const deletedTypeSeance = await typeSeanceService.deleteTypeSeance(
//       typeSeanceId
//     );

//     if (!deletedTypeSeance) {
//       return res.status(404).send("Type Seance not found");
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// const updateTypeSeance = async (req, res) => {
//     try {
//       const { _id, seance_ar, seance_fr, abreviation, charge } = req.body;
//       const updatedTypeSeance = await typeSeanceService.updateTypeSeance(_id, {
//         seance_ar,
//         seance_fr,
//         abreviation,
//         charge,
//       });

//       if (!updatedTypeSeance) {
//         return res.status(404).send("Type Seance not found!");
//       }

//       res.json(updatedTypeSeance);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message);
//     }
//   };

const getRattrapagesByClassId = async (req, res) => {
  try {
    const { classId } = req.params;
    const rattrapages = await rattrapageService.getRattrapagesByClassId(classId);
    res.json(rattrapages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching rattrapages by class ID" });
  }
};
const getRattrapagesByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const rattrapages = await rattrapageService.getRattrapagesByTeacherId(teacherId);
    res.json(rattrapages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching rattrapages by teacher ID" });
  }
};

module.exports = {
  getRattrapages,
  createRattrapage,
  updateRattrapageEtatStatus,
  getRattrapagesByClassId,
  getRattrapagesByTeacherId
};