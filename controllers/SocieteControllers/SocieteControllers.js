const SocieteServices = require("../../services/SocieteServices/SocieteServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addNewSociete = async (req, res) => {
  try {
    const { nom, encadrant, matricule, adresse, responsable, siteweb, phone } =
      req.body;

    const societe = await SocieteServices.createSociete(
      {
        nom,
        encadrant,
        matricule,
        adresse,
        responsable,
        siteweb,
        phone,
      },
      useNewDb(req)
    );
    res.json(societe);
  } catch (error) {
    console.error("Error while creating new societe in controllers", error);
  }
};

const getAllSocietes = async (req, res) => {
  try {
    const societes = await SocieteServices.getSocietes(useNewDb(req));
    res.json(societes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error while fetching societes in controllers", error.message);
  }
};

const getSocieteByName = async (req, res) => {
  try {
    const { name } = req.body;
    const societe = await SocieteServices.getSocieteByName(name, useNewDb(req));
    res.json(societe);
  } catch (error) {
    console.error(
      "Error while fetching societe by name in controllers",
      error.message
    );
  }
};

const getSocieteById = async (req, res) => {
  try {
    const { id } = req.body;

    const societe = await SocieteServices.getSocieteById(id, useNewDb(req));
    res.json(societe);
  } catch (error) {
    console.error(
      "Error while fetching societe by id in controllers",
      error.message
    );
  }
};

const deleteSociete = async (req, res) => {
  try {
    const societeId = req.params.id;

    const deletedSociete = await SocieteServices.deleteSociete(
      societeId,
      useNewDb(req)
    );

    if (!deletedSociete) {
      return res.status(404).send("Societe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error in delete societe controller", error);
    res.status(500).send(error.message);
  }
};

const updateSociete = async (req, res) => {
  try {
    const societeId = req.params.id;
    const { nom, encadrant, matricule, adresse, responsable, siteweb, phone } =
      req.body;

    const updatedSociete = await SocieteServices.updateSociete(
      societeId,
      {
        nom,
        encadrant,
        matricule,
        adresse,
        responsable,
        siteweb,
        phone,
      },
      useNewDb(req)
    );

    if (!updatedSociete) {
      return res.status(404).send("Societe not found!");
    }
    res.json(updatedSociete);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllSocietes,
  addNewSociete,
  getSocieteByName,
  getSocieteById,
  deleteSociete,
  updateSociete,
};
