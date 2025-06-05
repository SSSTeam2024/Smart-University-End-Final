const diversDocExtraService = require("../../services/DiversDocExtraServices/DiversDocExtraServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createDiversDocExtra = async (req, res) => {
  try {
    const {
      model_id,
      extra_data,
    } = req.body;

    const diversDocExtra = await diversDocExtraService.createDiversDocExtra(
      {
        model_id,
        extra_data,
      },
      useNewDb(req)
    );
    res.json(diversDocExtra);
  } catch (error) {
    console.error(error);
  }
};

const updateDiversDocExtraById = async (req, res) => {
  try {
    const diversDocExtraId = req.params.id;
    const {
      model_id,
      extra_data,
    } = req.body;

    const updatedDiversDocExtra = await diversDocExtraService.updateDiversDocExtra(
      diversDocExtraId,
      {
        model_id,
        extra_data,
      },
      useNewDb(req)
    );

    if (!updatedDiversDocExtra) {
      return res.status(404).send("DiversDocExtra not found!");
    }
    res.json(updatedDiversDocExtra);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDiversDocExtraById = async (req, res) => {
  try {
    const diversDocExtraId = req.params.id;

    const diversDocExtra = await diversDocExtraService.getDiversDocExtraById(
      diversDocExtraId,
      useNewDb(req)
    );

    if (!diversDocExtra) {
      return res.status(404).send("DiversDocExtra not found");
    }
    res.json(diversDocExtra);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllDiversDocExtra = async (req, res) => {
  try {
    const diversDocExtra = await diversDocExtraService.getAllDiversDocExtra(
      useNewDb(req)
    );
    res.json(diversDocExtra);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDiversDocExtraById = async (req, res) => {
  try {
    const diversDocExtraId = req.params.id;

    const deletedDiversDocExtra = await diversDocExtraService.deleteDiversDocExtra(
      departmentId,
      useNewDb(req)
    );

    if (!deletedDiversDocExtra) {
      return res.status(404).send("DiversDocExtra not found");
    }
    res.status(200).json({
      message: "DiversDocExtra deleted successfully",
      data: deletedDiversDocExtra,
    });
  } catch (error) {
    console.error("Error in deleteDiversDocExtraById controller:", error);
    res.status(500).send(error.message);
  }
};

const getDiversDocExtraByModelId = async (req, res) => {
  try {
    const modelId = req.params.id;

    const diversDocExtra = await diversDocExtraService.getDiversDocExtraByModelId(
      modelId,
      useNewDb(req)
    );

    if (!diversDocExtra) {
      return res.status(404).send("DiversDocExtra not found");
    }
    res.json(diversDocExtra);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createDiversDocExtra,
  updateDiversDocExtraById,
  getDiversDocExtraById,
  getAllDiversDocExtra,
  deleteDiversDocExtraById,
  getDiversDocExtraByModelId
};
