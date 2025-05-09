const parcoursService = require("../../services/ParcoursServices/ParcoursServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createParcours = async (req, res) => {
  try {
    const {
      code_parcours,
      nom_parcours,
      domaine,
      mention,
      type_parcours,
      modules,
      semestre_parcours,
    } = req.body;

    const parcours = await parcoursService.createParcours(
      {
        code_parcours,
        nom_parcours,
        domaine,
        mention,
        type_parcours,
        modules,
        semestre_parcours,
      },
      useNewDb(req)
    );
    res.json(parcours);
    // console.log("parcours", parcours);
  } catch (error) {
    console.error(error);
  }
};

const updateParcours = async (req, res) => {
  try {
    const parcoursId = req.params.id;
    const {
      code_parcours,
      nom_parcours,
      domaine,
      mention,
      type_parcours,
      modules,
      semestre_parcours,
    } = req.body;

    const updatedParcours = await parcoursService.updateParcours(
      parcoursId,
      {
        code_parcours,
        nom_parcours,
        domaine,
        mention,
        type_parcours,
        modules,
        semestre_parcours,
      },
      useNewDb(req)
    );

    if (!updatedParcours) {
      return res.status(404).send("Parcours not found!");
    }
    res.json(updatedParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllParcours = async (req, res) => {
  try {
    const parcours = await parcoursService.getAllParcours(useNewDb(req));
    res.json(parcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteParcours = async (req, res) => {
  try {
    const parcoursId = req.params.id;

    const deletedParcoursId = await parcoursService.deleteParcours(
      parcoursId,
      useNewDb(req)
    );

    if (!deletedParcoursId) {
      return res.status(404).send("Parcours not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getParcoursByValue = async (req, res) => {
  try {
    const { nom_parcours, code_parcours } = req.body;
    if (!nom_parcours || !code_parcours) {
      return res
        .status(400)
        .json({ message: "nom_parcours and code_parcours are required" });
    }

    const parcoursByValue = await parcoursService.getParcourByValue(
      {
        nom_parcours,
        code_parcours,
      },
      useNewDb(req)
    );

    if (!parcoursByValue) {
      return res.json(null);
    }

    res.json({
      id: parcoursByValue._id,
      nom_parcours: parcoursByValue.nom_parcours,
      code_parcours: parcoursByValue.code_parcours,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getSemestresByParcoursId = async (req, res) => {
  const { id } = req.body; // Get parcoursId from request URL
  console.log("id controller", id);
  try {
    const semestres = await parcoursService.getSemestresByParcoursId(
      id,
      useNewDb(req)
    );
    res.status(200).json(semestres);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  deleteParcours,
  getAllParcours,
  updateParcours,
  createParcours,
  getParcoursByValue,
  getSemestresByParcoursId,
};
