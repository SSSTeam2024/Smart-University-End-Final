const stagePfeServices = require("../../services/StagePfeServices/StagePfeServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createStagePfe = async (req, res) => {
  try {
    const {
      etudiant,
      type_stage,
      binome,
      encadrant_univ1,
      encadrant_univ2,
      encadrant_societe1,
      encadrant_societe2,
      societe,
      status_stage,
      date_debut,
      date_fin,
      sujet,
      description,
      mot_cle,
      biblio,
      date_soutenance,
      heure_debut,
      heure_fin,
      salle,
      avancement,
      avis,
      mention,
      remarque,
      note,
      rapporteur1,
      rapporteur2,
      examinateur1,
      examinateur2,
      invite1,
      invite2,
      chef_jury,
      file_affectation_etudiant_base64,
      file_affectation_etudiant_extension,
      file_affectation_binome_base64,
      file_affectation_binome_extension,
      file_proposition_base64,
      file_proposition_extension,
      file_proposition_signe_base64,
      file_proposition_signe_extension,
      file_attestation_base64,
      file_attestation_extension,
      file_rapport_base64,
      file_rapport_extension,
    } = req.body;

    const affactationEtudiantPath = "files/affectationEtudiantFiles/";
    const affactationBinomePath = "files/affectationBinomeFiles/";
    const propositionPath = "files/propositionFiles/";
    const propositionSignePath = "files/propositionSigneFiles/";
    const attestationPath = "files/attestationFiles/";
    const rapportPath = "files/rapportFiles/";

    let file_rapport = globalFunctions.generateUniqueFilename(
      file_rapport_extension,
      "Rapport"
    );

    let file_affectation_etudiant = globalFunctions.generateUniqueFilename(
      file_affectation_etudiant_extension,
      "AffectationEtudiant"
    );

    let file_affectation_binome = globalFunctions.generateUniqueFilename(
      file_affectation_binome_extension,
      "AffectationBinome"
    );

    let file_proposition = globalFunctions.generateUniqueFilename(
      file_proposition_extension,
      "Proposition"
    );

    let file_proposition_signe = globalFunctions.generateUniqueFilename(
      file_proposition_signe_extension,
      "PropositionSigne"
    );

    let file_attestation = globalFunctions.generateUniqueFilename(
      file_attestation_extension,
      "Attestation"
    );

    let documents = [
      {
        base64String: file_affectation_etudiant_base64,
        extension: file_affectation_etudiant_extension,
        name: file_affectation_etudiant,
        path: affactationEtudiantPath,
      },
      {
        base64String: file_affectation_binome_base64,
        extension: file_affectation_binome_extension,
        name: file_affectation_binome,
        path: affactationBinomePath,
      },
      {
        base64String: file_proposition_base64,
        extension: file_proposition_extension,
        name: file_proposition,
        path: propositionPath,
      },
      {
        base64String: file_proposition_signe_base64,
        extension: file_proposition_signe_extension,
        name: file_proposition_signe,
        path: propositionSignePath,
      },
      {
        base64String: file_attestation_base64,
        extension: file_attestation_extension,
        name: file_attestation,
        path: attestationPath,
      },
      {
        base64String: file_rapport_base64,
        extension: file_rapport_extension,
        name: file_rapport,
        path: rapportPath,
      },
    ];

    const StagePfe = await stagePfeServices.createStagePfe(
      {
        etudiant,
        type_stage,
        binome,
        encadrant_univ1,
        encadrant_univ2,
        encadrant_societe1,
        encadrant_societe2,
        societe,
        status_stage,
        date_debut,
        date_fin,
        sujet,
        description,
        mot_cle,
        biblio,
        date_soutenance,
        heure_debut,
        heure_fin,
        salle,
        avancement,
        avis,
        mention,
        remarque,
        note,
        rapporteur1,
        rapporteur2,
        examinateur1,
        examinateur2,
        invite1,
        invite2,
        chef_jury,
        file_attestation,
        file_proposition_signe,
        file_proposition,
        file_affectation_binome,
        file_affectation_etudiant,
        file_rapport,
      },
      documents,
      useNewDb(req)
    );
    res.status(200).json(StagePfe);
  } catch (error) {
    console.error("Error while creating new stage pfe in controllers", error);
    res.status(500).send(error.message);
  }
};

const updateStagePfe = async (req, res) => {
  try {
    const stagePfeId = req.params.id;
    const {
      etudiant,
      type_stage,
      binome,
      encadrant_univ1,
      encadrant_univ2,
      encadrant_societe1,
      encadrant_societe2,
      societe,
      status_stage,
      date_debut,
      date_fin,
      sujet,
      description,
      mot_cle,
      biblio,
      date_soutenance,
      heure_debut,
      heure_fin,
      salle,
      avancement,
      avis,
      mention,
      remarque,
      note,
      rapporteur1,
      rapporteur2,
      examinateur1,
      examinateur2,
      invite1,
      invite2,
      chef_jury,
      file_affectation_etudiant_base64,
      file_affectation_etudiant_extension,
      file_affectation_binome_base64,
      file_affectation_binome_extension,
      file_proposition_base64,
      file_proposition_extension,
      file_proposition_signe_base64,
      file_proposition_signe_extension,
      file_attestation_base64,
      file_attestation_extension,
      file_rapport_base64,
      file_rapport_extension,
    } = req.body;

    const affactationEtudiantPath = "files/affectationEtudiantFiles/";
    const affactationBinomePath = "files/affectationBinomeFiles/";
    const propositionPath = "files/propositionFiles/";
    const propositionSignePath = "files/propositionSigneFiles/";
    const attestationPath = "files/attestationFiles/";
    const rapportPath = "files/rapportFiles/";

    let stagePfeBody = {
      etudiant,
      type_stage,
      binome,
      encadrant_univ1,
      encadrant_univ2,
      encadrant_societe1,
      encadrant_societe2,
      societe,
      status_stage,
      date_debut,
      date_fin,
      sujet,
      description,
      mot_cle,
      biblio,
      date_soutenance,
      heure_debut,
      heure_fin,
      salle,
      avancement,
      avis,
      mention,
      remarque,
      note,
      rapporteur1,
      rapporteur2,
      examinateur1,
      examinateur2,
      invite1,
      invite2,
      chef_jury,
    };

    let file_attestation;
    let file_proposition_signe;
    let file_proposition;
    let file_affectation_binome;
    let file_affectation_etudiant;
    let file_rapport;

    let documents = [];

    if (file_rapport_base64 && file_rapport_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_rapport_extension,
        "Rapport"
      );
      stagePfeBody.file_rapport = file;

      documents.push({
        base64String: file_rapport_base64,
        extension: file_rapport_extension,
        name: file,
        path: rapportPath,
      });
    }

    if (
      file_affectation_etudiant_base64 &&
      file_affectation_etudiant_extension
    ) {
      file = globalFunctions.generateUniqueFilename(
        file_affectation_etudiant_extension,
        "AffectationEtudiant"
      );
      stagePfeBody.file_affectation_etudiant = file;

      documents.push({
        base64String: file_affectation_etudiant_base64,
        extension: file_affectation_etudiant_extension,
        name: file,
        path: affactationEtudiantPath,
      });
    }

    if (file_affectation_binome_base64 && file_affectation_binome_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_affectation_binome_extension,
        "AffectationBinome"
      );
      stagePfeBody.file_affectation_binome = file;

      documents.push({
        base64String: file_affectation_binome_base64,
        extension: file_affectation_binome_extension,
        name: file,
        path: affactationBinomePath,
      });
    }

    if (file_proposition_base64 && file_proposition_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_proposition_extension,
        "Proposition"
      );
      stagePfeBody.file_proposition = file;

      documents.push({
        base64String: file_proposition_base64,
        extension: file_proposition_extension,
        name: file,
        path: propositionPath,
      });
    }

    if (file_proposition_signe_base64 && file_proposition_signe_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_proposition_signe_extension,
        "PropositionSigne"
      );
      stagePfeBody.file_proposition_signe = file;

      documents.push({
        base64String: file_proposition_signe_base64,
        extension: file_proposition_signe_extension,
        name: file,
        path: propositionSignePath,
      });
    }

    if (file_attestation_base64 && file_attestation_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_attestation_extension,
        "Attestation"
      );
      stagePfeBody.file_attestation = file;

      documents.push({
        base64String: file_attestation_base64,
        extension: file_attestation_extension,
        name: file,
        path: attestationPath,
      });
    }

    const updatedStagePfe = await stagePfeServices.updateStagePfe(
      stagePfeId,
      stagePfeBody,
      documents,
      useNewDb(req)
    );

    if (!updatedStagePfe) {
      return res.status(404).send("Stage Pfe not found!");
    }
    res.json(updatedStagePfe);
  } catch (error) {
    console.error("Error while update stage pfe in controllers", error);
    res.status(500).send(error.message);
  }
};

const getStagesPfe = async (req, res) => {
  try {
    const VoieEnvoi = await stagePfeServices.getStagesPfe(useNewDb(req));
    res.status(200).json(VoieEnvoi);
  } catch (error) {
    console.error(
      "Error While fetching all stages pfe in controllers: ",
      error
    );
    res.status(500).send(error.message);
  }
};

const deleteStagePfe = async (req, res) => {
  try {
    const stagePfeId = req.params.id;

    const deletedStagePfe = await stagePfeServices.deleteStagePfe(
      stagePfeId,
      useNewDb(req)
    );

    if (!deletedStagePfe) {
      return res.status(404).send("Stage Pfe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


const updateJuryAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rapporteur1,
      rapporteur2,
      examinateur1,
      examinateur2,
      invite1,
      invite2,
      chef_jury,
    } = req.body;

    const updatedStage = await stagePfeServices.updateJuryAssignment(
      id,
      {
        rapporteur1,
        rapporteur2,
        examinateur1,
        examinateur2,
        invite1,
        invite2,
        chef_jury,
      },
      useNewDb(req)
    );

    if (!updatedStage) {
      return res.status(404).json({ message: "StagePfe not found" });
    }

    res.status(200).json({
      message: "Jury assigned successfully",
      data: updatedStage,
    });
  } catch (error) {
    console.error("Error assigning jury in controller:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Controller
const getDisponibilite = async (req, res) => {
  try {
    const { date, heureDebut, heureFin, avecSoutenance } = req.body;

    if (!date || !heureDebut || !heureFin || !avecSoutenance) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const result = await stagePfeServices.getDisponibiliteDetails(
      date,
      heureDebut,
      heureFin,
      avecSoutenance,
      useNewDb(req)
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getDisponibilite:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  deleteStagePfe,
  getStagesPfe,
  createStagePfe,
  updateStagePfe,
  updateJuryAssignment,
  getDisponibilite
};
