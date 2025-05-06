const niveauClasseService = require("../../services/NiveauClasseServices/NiveauClasseServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addNiveauClasse = async (req, res) => {
  try {
    const { abreviation, name_niveau_fr, name_niveau_ar, sections, cycles } =
      req.body;

    const niveauClasse = await niveauClasseService.registerNiveauClasse(
      {
        abreviation,
        name_niveau_fr,
        name_niveau_ar,
        sections,
        cycles,
      },
      useNewDb(req)
    );
    res.json(niveauClasse);
  } catch (error) {
    console.error(error);
  }
};

const updateNiveauClasseById = async (req, res) => {
  try {
    const niveauClasseId = req.params.id;
    const { abreviation, name_niveau_fr, name_niveau_ar, sections, cycles } =
      req.body;

    const updatedNiveauClasse = await niveauClasseService.updateNiveauClasseDao(
      niveauClasseId,
      {
        abreviation,
        name_niveau_fr,
        name_niveau_ar,
        sections,
        cycles,
      },
      useNewDb(req)
    );

    if (!updatedNiveauClasse) {
      return res.status(404).send("Niveau Classe not found!");
    }
    res.json(updatedNiveauClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNiveauClasseById = async (req, res) => {
  try {
    const niveauClasseId = req.params.id;

    const getNiveauClasse = await niveauClasseService.getNiveauClasseDaoById(
      niveauClasseId,
      useNewDb(req)
    );

    if (!getNiveauClasse) {
      return res.status(404).send("Niveau Classe not found");
    }
    res.json(getNiveauClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllNiveauxClasse = async (req, res) => {
  try {
    const niveauxClasse = await niveauClasseService.getNiveauxClasseDao(
      useNewDb(req)
    );
    res.json(niveauxClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteNiveauClasseById = async (req, res) => {
  try {
    const niveauClasseId = req.params.id;

    const deletedNiveauClasse = await niveauClasseService.deleteNiveauClasse(
      niveauClasseId,
      useNewDb(req)
    );

    if (!deletedNiveauClasse) {
      return res.status(404).send("Niveau Classe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

async function getSectionsByIdNiveau(req, res) {
  const { niveauClasseId } = req.params;

  try {
    const sections = await niveauClasseService.getSectionsByIdNiveau(
      niveauClasseId,
      useNewDb(req)
    );
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCyclesByIdNiveau(req, res) {
  const { niveauClasseId } = req.params;

  try {
    const cycles = await niveauClasseService.getCyclesByIdNiveau(
      niveauClasseId,
      useNewDb(req)
    );
    res.status(200).json(cycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getNiveauByValue = async (req, res) => {
  try {
    const { name_niveau_fr, name_niveau_ar } = req.body;

    if (!name_niveau_fr || !name_niveau_ar) {
      return res
        .status(400)
        .json({ message: "name_niveau_fr and name_niveau_ar are required" });
    }

    const niveauValue = await niveauClasseService.getNiveauByValue(
      {
        name_niveau_fr,
        name_niveau_ar,
      },
      useNewDb(req)
    );

    if (!niveauValue) {
      return res.json(null);
    }

    res.json({
      id: niveauValue._id,
      cycle_fr: niveauValue.name_niveau_fr,
      cycle_ar: niveauValue.name_niveau_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteNiveauClasseById,
  getAllNiveauxClasse,
  getNiveauClasseById,
  updateNiveauClasseById,
  addNiveauClasse,
  getSectionsByIdNiveau,
  getCyclesByIdNiveau,
  getNiveauByValue,
};
