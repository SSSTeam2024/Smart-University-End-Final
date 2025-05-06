const EtatPersonnelService = require("../../services/EtatPersonnelServices/EtatPersonnelServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addEtatPersonnel = async (req, res) => {
  try {
    const { etat_ar, etat_fr } = req.body;

    const etatPersonnel = await EtatPersonnelService.registerEtatPersonnel(
      {
        etat_ar,
        etat_fr,
      },
      useNewDb(req)
    );
    res.json(etatPersonnel);
  } catch (error) {
    console.error(error);
  }
};

const updateEtatPersonnelById = async (req, res) => {
  try {
    const etatPersonnelId = req.params.id;
    const { etat_ar, etat_fr } = req.body;

    const updatedEtatPersonnel =
      await EtatPersonnelService.updateEtatPersonnelDao(
        etatPersonnelId,
        {
          etat_ar,
          etat_fr,
        },
        useNewDb(req)
      );

    if (!updatedEtatPersonnel) {
      return res.status(404).send("Etat Personnel not found!");
    }
    res.json(updatedEtatPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtatPersonnelById = async (req, res) => {
  try {
    const etatPersonnelId = req.params.id;

    const getEtatPersonnel = await EtatPersonnelService.getEtatPersonnelDaoById(
      etatPersonnelId,
      useNewDb(req)
    );

    if (!getEtatPersonnel) {
      return res.status(404).send("Etat Personnel not found");
    }
    res.json(getEtatPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtatByValue = async (req, res) => {
  try {
    const { etat_fr, etat_ar } = req.body;

    if (!etat_fr || !etat_ar) {
      return res
        .status(400)
        .json({ message: "etat_fr and etat_ar are required" });
    }

    const etatValue = await EtatPersonnelService.getEtatByValue(
      {
        etat_fr,
        etat_ar,
      },
      useNewDb(req)
    );

    if (!etatValue) {
      return res.json(null);
    }

    res.json({
      id: etatValue._id,
      etat_fr: etatValue.etat_fr,
      etat_ar: etatValue.etat_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllEtatPersonnel = async (req, res) => {
  try {
    const etatPersonnels = await EtatPersonnelService.getEtatsPersonnelDao(
      useNewDb(req)
    );
    res.json(etatPersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEtatPersonnelById = async (req, res) => {
  try {
    const etatPersonnelId = req.params.id;

    const deletedEtatPersonnel =
      await EtatPersonnelService.deleteEtatPersonnelDao(
        etatPersonnelId,
        useNewDb(req)
      );

    if (!deletedEtatPersonnel) {
      return res.status(404).send("Etat Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteEtatPersonnelById,
  getAllEtatPersonnel,
  getEtatPersonnelById,
  updateEtatPersonnelById,
  addEtatPersonnel,
  getEtatByValue,
};
