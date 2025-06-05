const typeStageServices = require("../../services/TypeStageServices/TypeStageServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addTypeStage = async (req, res) => {
  try {
    const {
      nom_fr,
      nom_ar,
      choix,
      niveau,
      max_etudiant,
      duree_min,
      date_debut,
      date_fin,
      avec_encadrement,
      avec_soutenance,
      avec_commission,
      avec_validation_soutenance,
      localite,
      classes,
      encadrement,
      soutenance,
      files,
    } = req.body;

    const TypeStage = await typeStageServices.createTypeStage(
      {
        nom_fr,
        nom_ar,
        choix,
        niveau,
        max_etudiant,
        duree_min,
        date_debut,
        date_fin,
        avec_encadrement,
        avec_soutenance,
        avec_commission,
        avec_validation_soutenance,
        localite,
        classes,
        encadrement,
        soutenance,
        files,
      },
      useNewDb(req)
    );

    res.json(TypeStage);
  } catch (error) {
    console.error("Error Adding New Type Stage in Controllers", error);
  }
};

const updateTypeStageById = async (req, res) => {
  try {
    const TypeStageId = req.params.id;
    const {
      nom_fr,
      nom_ar,
      choix,
      niveau,
      max_etudiant,
      duree_min,
      date_debut,
      date_fin,
      avec_encadrement,
      avec_soutenance,
      avec_commission,
      avec_validation_soutenance,
      localite,
      classes,
      encadrement,
      soutenance,
      files,
    } = req.body;

    const updatedTypeStage = await typeStageServices.updateTypeStage(
      TypeStageId,
      {
        nom_fr,
        nom_ar,
        choix,
        niveau,
        max_etudiant,
        duree_min,
        date_debut,
        date_fin,
        avec_encadrement,
        avec_soutenance,
        avec_commission,
        avec_validation_soutenance,
        localite,
        classes,
        encadrement,
        soutenance,
        files,
      },
      useNewDb(req)
    );

    if (!updatedTypeStage) {
      return res.status(404).send("Type Stage not found!");
    }
    res.json(updatedTypeStage);
  } catch (error) {
    console.error("Error Updating Type Stage in Controllers", error);
    res.status(500).send(error.message);
  }
};

const getAllTypeStage = async (req, res) => {
  try {
    const TypeStage = await typeStageServices.getAllTypeStage(useNewDb(req));
    res.json(TypeStage);
  } catch (error) {
    console.error("Error Fetching Types Stage in Controllers", error);
    res.status(500).send(error.message);
  }
};

const deleteTypeStageById = async (req, res) => {
  try {
    const TypeStageId = req.params.id;

    const deletedTypeStage = await typeStageServices.deleteTypeStage(
      TypeStageId,
      useNewDb(req)
    );

    if (!deletedTypeStage) {
      return res.status(404).send("Type Stage not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error Removing Type Stage in Controllers", error);
    res.status(500).send(error.message);
  }
};

const getTypeStageById = async (req, res) => {
  try {
    const { typeId } = req.body;
    const TypeStage = await typeStageServices.getTypeStageById(
      typeId,
      useNewDb(req)
    );
    res.json(TypeStage);
  } catch (error) {
    console.error("Error getting type stage by id in controllers : ", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteTypeStageById,
  getAllTypeStage,
  updateTypeStageById,
  addTypeStage,
  getTypeStageById,
};
