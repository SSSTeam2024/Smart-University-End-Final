const CommissionServices = require("../../services/CommissionServices/CommissionServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addCommission = async (req, res) => {
  try {
    const { titre_fr, titre_ar, date_creation, date_fin, groupes, membres } =
      req.body;

    const Commission = await CommissionServices.createCommission(
      {
        titre_fr,
        titre_ar,
        date_creation,
        date_fin,
        groupes,
        membres,
      },
      useNewDb(req)
    );
    res.json(Commission);
  } catch (error) {
    console.error(error);
  }
};

const updateCommissionById = async (req, res) => {
  try {
    const CommissionId = req.params.id;
    const { titre_fr, titre_ar, date_creation, date_fin, groupes, membres } =
      req.body;

    const updatedCommission = await CommissionServices.updateCommission(
      CommissionId,
      {
        titre_fr,
        titre_ar,
        date_creation,
        date_fin,
        groupes,
        membres,
      },
      useNewDb(req)
    );

    if (!updatedCommission) {
      return res.status(404).send("Commission not found!");
    }
    res.json(updatedCommission);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllCommission = async (req, res) => {
  try {
    const Commissions = await CommissionServices.getAllCommissions(
      useNewDb(req)
    );
    res.json(Commissions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCommissionById = async (req, res) => {
  try {
    const CommissionId = req.params.id;

    const deletedCommission = await CommissionServices.deleteCommission(
      CommissionId,
      useNewDb(req)
    );

    if (!deletedCommission) {
      return res.status(404).send("Commission not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteCommissionById,
  getAllCommission,
  updateCommissionById,
  addCommission,
};
