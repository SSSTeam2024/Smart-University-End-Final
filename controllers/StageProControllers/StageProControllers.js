const stageProServices = require("../../services/StageProServices/StageProServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createStagePro = async (req, res) => {
  try {
    const {
      etudiant,
      type_stage,
      binome,
      encadrant_univ,
      encadrant_societe,
      societe,
      status_stage,
      date_debut,
      date_fin,
      date_soutenance,
      sujet,
      description,
      avis,
      note,
      rapporteur,
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

    const affactationEtudiantPath = "files/stagePro/affectationEtudiantFiles/";
    const affactationBinomePath = "files/stagePro/affectationBinomeFiles/";
    const propositionPath = "files/stagePro/propositionFiles/";
    const propositionSignePath = "files/stagePro/propositionSigneFiles/";
    const attestationPath = "files/stagePro/attestationFiles/";
    const rapportPath = "files/stagePro/rapportFiles/";

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
    const StagePro = await stageProServices.createStagePro(
      {
        etudiant,
        type_stage,
        binome,
        encadrant_univ,
        encadrant_societe,
        societe,
        status_stage,
        date_debut,
        date_fin,
        date_soutenance,
        sujet,
        description,
        avis,
        note,
        rapporteur,
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
    res.status(200).json(StagePro);
  } catch (error) {
    console.error("Error while creating new stage Pro in controllers", error);
    res.status(500).send(error.message);
  }
};

const updateStagePro = async (req, res) => {
  try {
    const stageProId = req.params.id;
    const {
      etudiant,
      type_stage,
      binome,
      encadrant_univ,
      encadrant_societe,
      societe,
      status_stage,
      date_debut,
      date_fin,
      date_soutenance,
      sujet,
      description,
      avis,
      note,
      rapporteur,
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

    const affactationEtudiantPath = "files/stagePro/affectationEtudiantFiles/";
    const affactationBinomePath = "files/stagePro/affectationBinomeFiles/";
    const propositionPath = "files/stagePro/propositionFiles/";
    const propositionSignePath = "files/stagePro/propositionSigneFiles/";
    const attestationPath = "files/stagePro/attestationFiles/";
    const rapportPath = "files/stagePro/rapportFiles/";

    let stageProBody = {
      etudiant,
      type_stage,
      binome,
      encadrant_univ,
      encadrant_societe,
      societe,
      status_stage,
      date_debut,
      date_fin,
      date_soutenance,
      sujet,
      description,
      avis,
      note,
      rapporteur,
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
      stageProBody.file_rapport = file;

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
      stageProBody.file_affectation_etudiant = file;

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
      stageProBody.file_affectation_binome = file;

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
      stageProBody.file_proposition = file;

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
      stageProBody.file_proposition_signe = file;

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
      stageProBody.file_attestation = file;

      documents.push({
        base64String: file_attestation_base64,
        extension: file_attestation_extension,
        name: file,
        path: attestationPath,
      });
    }

    const updatedStagePro = await stageProServices.updateStagePro(
      stageProId,
      stageProBody,
      documents,
      useNewDb(req)
    );

    if (!updatedStagePro) {
      return res.status(404).send("Stage Pro not found!");
    }
    res.json(updatedStagePro);
  } catch (error) {
    console.error("Error while update stage Pro in controllers", error);
    res.status(500).send(error.message);
  }
};

const getStagesPro = async (req, res) => {
  try {
    const VoieEnvoi = await stageProServices.getStagesPro(useNewDb(req));
    res.status(200).json(VoieEnvoi);
  } catch (error) {
    console.error(
      "Error While fetching all stages Pro in controllers: ",
      error
    );
    res.status(500).send(error.message);
  }
};

const deleteStagePro = async (req, res) => {
  try {
    const stageProId = req.params.id;

    const deletedStagePro = await stageProServices.deleteStagePro(
      stageProId,
      useNewDb(req)
    );

    if (!deletedStagePro) {
      return res.status(404).send("Stage Pro not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteStagePro,
  getStagesPro,
  createStagePro,
  updateStagePro,
};
