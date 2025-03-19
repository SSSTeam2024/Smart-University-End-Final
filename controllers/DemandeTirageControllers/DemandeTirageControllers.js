const demandeTirageServices = require("../../services/DemandeTirageServices/DemandeTirageServices");
const globalFunctions = require("../../utils/globalFunctions");

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
      etat,
      added_by,
      note,
      couleur
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
        etat,
        added_by,
        note,
        couleur
      },
      documents
    );
    res.json(demandeTirage);
  } catch (error) {
    console.error(error);
  }
};

const getAllDemandeTirage = async (req, res) => {
  try {
    const demandesTirage =
      await demandeTirageServices.getAllDemandesTirage();
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

// const deleteAbsenceEtudiantById = async (req, res) => {
//   try {
//     const absenceEtudiantId = req.params.id;

//     const deletedAbsenceEtudiant =
//       await absenceEtudiantServices.deleteAbsenceEtudiant(absenceEtudiantId);

//     if (!deletedAbsenceEtudiant) {
//       return res.status(404).send("Absence Etudiant not found");
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

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

module.exports = {
  addDemandeTirage,
  getAllDemandeTirage
};
