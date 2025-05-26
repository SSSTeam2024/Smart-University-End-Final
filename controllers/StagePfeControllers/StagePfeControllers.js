const stagePfeServices = require("../../services/StagePfeServices/StagePfeServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createStagePfe = async (req, res) => {
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
    } = req.body;

    const StagePfe = await stagePfeServices.createStagePfe(
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
      },
      useNewDb(req)
    );
    res.status(200).json(StagePfe);
  } catch (error) {
    console.error("Error while creating new stage pfe in controllers", error);
    res.status(500).send(error.message);
  }
};

// const updateStagePfe = async (req, res) => {
//   try {
//     const stagePfeId = req.params.id;
//     const { titre } = req.body;

//     const updatedVoieEnvoi = await stagePfeServices.updateVoieEnvoi(
//       VoieEnvoiId,
//       {
//         titre,
//       },
//       useNewDb(req)
//     );

//     if (!updatedVoieEnvoi) {
//       return res.status(404).send("Voie Envoi not found!");
//     }
//     res.json(updatedVoieEnvoi);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

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

// const deleteStagePfe = async (req, res) => {
//   try {
//     const stagePfeId = req.params.id;

//     const deletedVoieEnvoi = await stagePfeServices.deleteVoieEnvoi(
//       VoieEnvoiId,
//       useNewDb(req)
//     );

//     if (!deletedVoieEnvoi) {
//       return res.status(404).send("Voie Envoi not found");
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

module.exports = {
  //   deleteVoieEnvoiById,
  //   getAllVoieEnvoi,
  getStagesPfe,
  createStagePfe,
};
