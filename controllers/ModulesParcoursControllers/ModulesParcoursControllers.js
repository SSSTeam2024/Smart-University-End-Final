const moduleParcoursService = require("../../services/ModulesParcoursServices/ModulesParcoursServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createModuleParcours = async (req, res) => {
  try {
    const {
      code_Ue,
      libelle,
      credit,
      coef,
      nature,
      regime,
      parcours,
      semestre_module,
      matiere,
    } = req.body;

    const moduleParcours = await moduleParcoursService.createModulesParcours(
      {
        code_Ue,
        libelle,
        credit,
        coef,
        nature,
        regime,
        parcours,
        semestre_module,
        matiere,
      },
      useNewDb(req)
    );
    console.log("create moduleParcours ctrl", moduleParcours);
    res.json(moduleParcours);
  } catch (error) {
    console.error(error);
  }
};

const updateModuleParcours = async (req, res) => {
  try {
    const moduleParcoursId = req.params.id;
    const {
      code_Ue,
      libelle,
      credit,
      coef,
      nature,
      regime,
      parcours,
      matiere,
      semestre_module,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(parcours)) {
      return res.status(400).json({ message: "Invalid parcours ID" });
    }

    const updatedModuleParcours =
      await moduleParcoursService.updateModuleParcours(
        moduleParcoursId,
        {
          code_Ue,
          libelle,
          credit,
          coef,
          nature,
          regime,
          parcours,
          matiere,
          semestre_module,
        },
        useNewDb(req)
      );

    if (!updatedModuleParcours) {
      return res.status(404).send("Module Parcours not found!");
    }
    res.json(updatedModuleParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllModulesParcours = async (req, res) => {
  try {
    const moduleParcours = await moduleParcoursService.getAllModulesParcours(
      useNewDb(req)
    );
    res.json(moduleParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteModuleParcours = async (req, res) => {
  try {
    const moduleParcoursId = req.params.id;

    const deletedModuleParcoursId =
      await moduleParcoursService.deleteModulesParcours(
        moduleParcoursId,
        useNewDb(req)
      );

    if (!deletedModuleParcoursId) {
      return res.status(404).send("Module Parcours not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getModuleByCode = async (req, res) => {
  try {
    const { code_Ue } = req.body;
    if (!code_Ue) {
      return res.status(400).json({ message: "code_Ue is required" });
    }

    const moduleByCode = await moduleParcoursService.getModuleByCode(
      {
        code_Ue,
      },
      useNewDb(req)
    );

    if (!moduleByCode) {
      return res.json(null);
    }

    res.json({
      id: moduleByCode._id,
      code_Ue: moduleByCode.code_Ue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllModulesParcours,
  deleteModuleParcours,
  updateModuleParcours,
  createModuleParcours,
  getModuleByCode,
};
