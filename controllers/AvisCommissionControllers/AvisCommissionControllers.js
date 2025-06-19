const AvisCommissionServices = require("../../services/AvisCommissionServices/AvisCommissionServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createAvisCommission = async (req, res) => {
  try {
    const { commission, type_stage, liste, etat } = req.body;

    const avisCommission = await AvisCommissionServices.createAvisCommission(
      {
        commission,
        type_stage,
        liste,
        etat,
      },
      useNewDb(req)
    );
    res.json(avisCommission);
  } catch (error) {
    console.error(error);
  }
};

const updateAvisCommission = async (req, res) => {
  try {
    const avisCommissionId = req.params.id;
    const { commission, type_stage, liste, etat } = req.body;

    const updatedAvisCommission =
      await AvisCommissionServices.updateAvisCommission(
        avisCommissionId,
        {
          commission,
          type_stage,
          liste,
          etat,
        },
        useNewDb(req)
      );

    if (!updatedAvisCommission) {
      return res.status(404).send("Avis Commission not found!");
    }
    res.json(updatedAvisCommission);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAvisCommissions = async (req, res) => {
  try {
    const AvisCommission = await AvisCommissionServices.getAvisCommissions(
      useNewDb(req)
    );
    res.json(AvisCommission);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteAvisCommission = async (req, res) => {
  try {
    const avisCommissionId = req.params.id;

    const deletedAvisCommission =
      await AvisCommissionServices.deleteAvisCommission(
        avisCommissionId,
        useNewDb(req)
      );

    if (!deletedAvisCommission) {
      return res.status(404).send("Avis Commission not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteAvisCommission,
  getAvisCommissions,
  updateAvisCommission,
  createAvisCommission,
};
