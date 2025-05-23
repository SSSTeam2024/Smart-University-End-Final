const demandePersonnelService = require("../../services/demandePersonnelServices/demandePersonnelServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createDemandePersonnel = async (req, res) => {
  try {
    const DemandePersonnel =
      await demandePersonnelService.createDemandePersonnel(
        req.body,
        useNewDb(req)
      );
    res.status(201).json(DemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandesByPersonnelId = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const demandes = await demandePersonnelService.getDemandesByPersonnelId(
      personnelId,
      useNewDb(req)
    );

    if (!demandes) {
      return res.status(404).send("Aucun Demande pour ce personnel !!");
    }
    res.json(demandes);
  } catch (error) {
    console.error(
      "Error while fetching demandes by personnel id in controllers",
      error
    );
    res.status(500).send(error.message);
  }
};

const getAllDemandePersonnels = async (req, res) => {
  try {
    const DemandePersonnels =
      await demandePersonnelService.getAllDemandePersonnels(useNewDb(req));
    res.status(200).json(DemandePersonnels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandePersonnelById = async (req, res) => {
  try {
    const DemandePersonnel =
      await demandePersonnelService.getDemandePersonnelById(
        req.params.id,
        useNewDb(req)
      );
    if (!DemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json(DemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemandePersonnel = async (req, res) => {
  try {
    const updatedDemandePersonnel =
      await demandePersonnelService.updateDemandePersonnel(
        req.body._id,
        req.body,
        useNewDb(req)
      );
    if (!updatedDemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json(updatedDemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDemandePersonnel = async (req, res) => {
  try {
    const deletedDemandePersonnel =
      await demandePersonnelService.deleteDemandePersonnel(
        req.params.id,
        useNewDb(req)
      );
    if (!deletedDemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json({ message: "DemandePersonnel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleDemandePersonnel = async (req, res) => {
  try {
    const { demandId, modelName, modelLangage } = req.body;
    const updatedDemandePersonnel =
      await demandePersonnelService.handleDemandePersonnel(
        demandId,
        modelName,
        modelLangage,
        useNewDb(req)
      );

    if (!updatedDemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json(updatedDemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteManyDemandePersonnel = async (req, res) => {
  try {
    const demandeIds = req.body.ids;

    if (!demandeIds || demandeIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteDemandeResult =
      await demandePersonnelService.deleteManyDemandePersonnel(
        useNewDb(req),
        demandeIds
      );

    if (deleteDemandeResult.deletedCount === 0) {
      return res.status(404).send("No Demandes found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  deleteManyDemandePersonnel,
  handleDemandePersonnel,
  getDemandesByPersonnelId,
};
