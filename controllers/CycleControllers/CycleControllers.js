const cycleService = require("../../services/CycleServices/CycleServices");

const addCycle = async (req, res) => {
  try {
    const { cycle_ar, cycle_fr } = req.body;

    const cycle = await cycleService.registerCycle({
      cycle_ar,
      cycle_fr,
    });
    res.json(cycle);
  } catch (error) {
    console.error(error);
  }
};

const updateCycleById = async (req, res) => {
  try {
    const cycleId = req.params.id;
    const { cycle_ar, cycle_fr } = req.body;

    const updatedCycle = await cycleService.updateCycleDao(cycleId, {
      cycle_ar,
      cycle_fr,
    });

    if (!updatedCycle) {
      return res.status(404).send("Cycle not found!");
    }
    res.json(updatedCycle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCycleById = async (req, res) => {
  try {
    const cycleId = req.params.id;

    const getCycle = await cycleService.getCycleDaoById(cycleId);

    if (!getCycle) {
      return res.status(404).send("Cycle not found");
    }
    res.json(getCycle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllCycle = async (req, res) => {
  try {
    const cycle = await cycleService.getAllCycleDao();
    res.json(cycle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCycleById = async (req, res) => {
  try {
    const cycleId = req.params.id;

    const deletedCycle = await cycleService.deleteCycleDao(cycleId);

    if (!deletedCycle) {
      return res.status(404).send("Cycle not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getCycleByValue = async (req, res) => {
  try {
    const { cycle_fr, cycle_ar } = req.body;

    if (!cycle_fr || !cycle_ar) {
      return res
        .status(400)
        .json({ message: "cycle_fr and cycle_ar are required" });
    }

    const cycleValue = await cycleService.getCycleByValue({
      cycle_fr,
      cycle_ar,
    });

    if (!cycleValue) {
      return res.json(null);
    }

    res.json({
      id: cycleValue._id,
      cycle_fr: cycleValue.cycle_fr,
      cycle_ar: cycleValue.cycle_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCycleByValue,
  deleteCycleById,
  getAllCycle,
  getCycleById,
  updateCycleById,
  addCycle,
};
