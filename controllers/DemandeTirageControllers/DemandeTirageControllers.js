const demandeTirageServices = require("../../services/DemandeTirageServices/DemandeTirageServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addDemandeTirage = async (req, res) => {
  try {
    const {
      semestre,
      classes,
      enseignant,
      matiere,
      docFileExtension,
      docFileBase64String,
      titre,
      nbr_page,
      recto_verso,
      nbr_copies,
      format,
      date_envoi_demande,
      heure_envoi_demande,
      date_limite,
      heure_limite,
      date_recuperation,
      heure_recuperation,
      date_impression,
      heure_impression,
      date_refus,
      heure_refus,
      etat,
      added_by,
      note,
      couleur,
    } = req.body;

    const docPath = "files/demandeTirageFiles/";

    let file_document = globalFunctions.generateUniqueFilename(
      docFileExtension,
      "doc"
    );
    let documents = [
      {
        base64String: docFileBase64String,
        extension: docFileExtension,
        name: file_document,
        path: docPath,
      },
    ];
    const demandeTirage = await demandeTirageServices.createDemandeTirage(
      {
        semestre,
        classes,
        enseignant,
        matiere,
        file_document,
        titre,
        nbr_page,
        recto_verso,
        nbr_copies,
        format,
        date_envoi_demande,
        heure_envoi_demande,
        date_limite,
        heure_limite,
        date_recuperation,
        heure_recuperation,
        date_impression,
        heure_impression,
        date_refus,
        heure_refus,
        etat,
        added_by,
        note,
        couleur,
      },
      documents,
      useNewDb(req)
    );
    res.json(demandeTirage);
  } catch (error) {
    console.error(error);
  }
};

// const getAllDemandeTirage = async (req, res) => {
//   try {
//     const demandesTirage =
//       await demandeTirageServices.getAllDemandesTirage();
//     res.json(demandesTirage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

const getAllDemandeTirage = async (req, res) => {
  try {
    const demandesTirage = await demandeTirageServices.getAllDemandesTirage(
      useNewDb(req)
    );
    res.json(demandesTirage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const updateAbsenceEtudiantById = async (req, res) => {
//   try {
//     const absenceEtudiantId = req.params.id;
//     const {
//       classe,
//       enseignant,
//       etudiants,
//       seance,
//       departement,
//       date,
//       trimestre,
//       added_by,
//     } = req.body;

//     const updatedAbsenceEtudiant =
//       await absenceEtudiantServices.updateAbsenceEtudiant(absenceEtudiantId, {
//         classe,
//         enseignant,
//         etudiants,
//         seance,
//         departement,
//         date,
//         trimestre,
//         added_by,
//       });

//     if (!updatedAbsenceEtudiant) {
//       return res.status(404).send("Absence Etudiant not found!");
//     }
//     res.json(updatedAbsenceEtudiant);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// const getAbsenceEtudiantById = async (req, res) => {
//   try {
//     const absenceEtudiantId = req.params.id;

//     const getAbsenceEtudiant =
//       await absenceEtudiantServices.getAbsenceEtudiantById(absenceEtudiantId);

//     if (!getAbsenceEtudiant) {
//       return res.status(404).send("Absence Etudiant not found");
//     }
//     res.json(getAbsenceEtudiant);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

const deleteDemandeTirage = async (req, res) => {
  try {
    const demandeTirageId = req.params.id;

    const deletedDemandeTirage =
      await demandeTirageServices.deleteDemandeTirage(
        demandeTirageId,
        useNewDb(req)
      );

    if (!deletedDemandeTirage) {
      return res.status(404).send("Demande Tirage not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const updateEtatDemandeTirage = async (req, res) => {
  try {
    const { id } = req.params;
    const { etat, date, heure } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Demande Tirage ID is required." });
    }

    const updatedEtat =
      await demandeTirageServices.updateEtatDemandeTirageService(
        id,
        etat,
        date,
        heure,
        useNewDb(req)
      );

    if (!updatedEtat) {
      return res.status(404).json({ message: "demande Tirage not found." });
    }

    res.status(200).json({
      message: "demande Tirage updated successfully.",
      demandeTirage: updatedEtat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const getAllAbsenceClasse = async (req, res) => {
//   try {
//     const classId = req.params.id;
//     let classAbsences = await absenceEtudiantServices.getAllAbsenceClasse(
//       classId
//     );
//     res.json(classAbsences);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };
//
const getDemandesTirageByTeacherId = async (req, res) => {
  try {
    const { enseignantId } = req.params;
    const demandesTirage =
      await demandeTirageServices.getDemandesTirageByTeacherId(
        enseignantId,
        useNewDb(req)
      );
    res.json(demandesTirage);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching demandes tirage by teacher ID" });
  }
};

const deleteManyDemandesTirages = async (req, res) => {
  try {
    const demandeIds = req.body.ids;

    if (!demandeIds || demandeIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteDemandeTirageResult =
      await demandeTirageServices.deleteManyDemandesTirages(
        useNewDb(req),
        demandeIds
      );

    if (deleteDemandeTirageResult.deletedCount === 0) {
      return res.status(404).send("No Demande Tirage found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addDemandeTirage,
  getAllDemandeTirage,
  deleteDemandeTirage,
  updateEtatDemandeTirage,
  getDemandesTirageByTeacherId,
  deleteManyDemandesTirages,
};
