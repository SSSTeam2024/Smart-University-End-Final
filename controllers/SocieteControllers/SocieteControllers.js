const SocieteServices = require("../../services/SocieteServices/SocieteServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addNewSociete = async (req, res) => {
  try {
    const { nom, encadrant, infos } = req.body;

    const societe = await SocieteServices.createSociete(
      {
        nom,
        encadrant,
        infos,
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

module.exports = {
  getAllSocietes,
  addNewSociete,
  getSocieteByName,
};
