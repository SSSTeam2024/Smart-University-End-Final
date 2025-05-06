const IntervenantServices = require("../../services/IntervenantServices/IntervenantServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addIntervenant = async (req, res) => {
  try {
    const {
      nom_fr,
      nom_ar,
      cin,
      matricule,
      phone,
      email,
      site,
      address,
      abbreviation,
    } = req.body;

    const Intervenant = await IntervenantServices.createIntervenant(
      {
        nom_fr,
        nom_ar,
        cin,
        matricule,
        phone,
        email,
        site,
        address,
        abbreviation,
      },
      useNewDb(req)
    );
    res.json(Intervenant);
  } catch (error) {
    console.error(error);
  }
};

const updateIntervenantById = async (req, res) => {
  try {
    const IntervenantId = req.params.id;
    const {
      nom_fr,
      nom_ar,
      cin,
      matricule,
      phone,
      email,
      site,
      address,
      abbreviation,
    } = req.body;

    const updatedIntervenant = await IntervenantServices.updateIntervenant(
      IntervenantId,
      {
        nom_fr,
        nom_ar,
        cin,
        matricule,
        phone,
        email,
        site,
        address,
        abbreviation,
      },
      useNewDb(req)
    );

    if (!updatedIntervenant) {
      return res.status(404).send("Intervenant not found!");
    }
    res.json(updatedIntervenant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllIntervenant = async (req, res) => {
  try {
    const Intervenant = await IntervenantServices.getAllIntervenant(
      useNewDb(req)
    );
    res.json(Intervenant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteIntervenantById = async (req, res) => {
  try {
    const IntervenantId = req.params.id;

    const deletedIntervenant = await IntervenantServices.deleteIntervenant(
      IntervenantId,
      useNewDb(req)
    );

    if (!deletedIntervenant) {
      return res.status(404).send("Intervenant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteIntervenantById,
  getAllIntervenant,
  updateIntervenantById,
  addIntervenant,
};
