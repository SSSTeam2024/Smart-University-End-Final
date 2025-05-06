const VoieEnvoiServices = require("../../services/VoieEnvoiServices/VoieEnvoiServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addVoieEnvoi = async (req, res) => {
  try {
    const { titre } = req.body;

    const VoieEnvoi = await VoieEnvoiServices.createVoieEnvoi(
      {
        titre,
      },
      useNewDb(req)
    );
    res.json(VoieEnvoi);
  } catch (error) {
    console.error(error);
  }
};

const updateVoieEnvoiById = async (req, res) => {
  try {
    const VoieEnvoiId = req.params.id;
    const { titre } = req.body;

    const updatedVoieEnvoi = await VoieEnvoiServices.updateVoieEnvoi(
      VoieEnvoiId,
      {
        titre,
      },
      useNewDb(req)
    );

    if (!updatedVoieEnvoi) {
      return res.status(404).send("Voie Envoi not found!");
    }
    res.json(updatedVoieEnvoi);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllVoieEnvoi = async (req, res) => {
  try {
    const VoieEnvoi = await VoieEnvoiServices.getAllVoieEnvoi(useNewDb(req));
    res.json(VoieEnvoi);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteVoieEnvoiById = async (req, res) => {
  try {
    const VoieEnvoiId = req.params.id;

    const deletedVoieEnvoi = await VoieEnvoiServices.deleteVoieEnvoi(
      VoieEnvoiId,
      useNewDb(req)
    );

    if (!deletedVoieEnvoi) {
      return res.status(404).send("Voie Envoi not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteVoieEnvoiById,
  getAllVoieEnvoi,
  updateVoieEnvoiById,
  addVoieEnvoi,
};
