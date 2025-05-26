const resultatService = require("../../services/ResultatServices/ResultatServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addResultat = async (req, res) => {
  try {
    const { etudiants } = req.body;

    const salleJson = await resultatService.createResultat(
      {
        etudiants,
      },
      useNewDb(req)
    );
    res.json(salleJson);
  } catch (error) {
    console.error(error);
  }
};

const getAllResultat = async (req, res) => {
  try {
    const resultats = await resultatService.getResultats(useNewDb(req));
    res.json(resultats);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateResultat = async (req, res) => {
  try {
    const { id } = req.params;
    const { etudiants: incomingEtudiants } = req.body;

    const existingResultat = await resultatService.getResultatById(
      id,
      useNewDb(req)
    );

    if (!existingResultat) return res.status(404).send("Resultat not found");
    const updatedEtudiants = existingResultat.etudiants.map(
      (existingEtudiant) => {
        const existingId =
          existingEtudiant.etudiant._id?.toString() ||
          existingEtudiant.etudiant.toString();
        const incoming = incomingEtudiants.find(
          (e) => e.etudiant === existingId
        );

        if (!incoming) return existingEtudiant;

        return {
          ...existingEtudiant.toObject(),
          ...incoming,
        };
      }
    );

    const updatedResultat = await resultatService.updateResultat(
      id,
      {
        etudiants: updatedEtudiants,
      },
      useNewDb(req)
    );

    res.json(updatedResultat);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteResultatById = async (req, res) => {
  try {
    const resultId = req.params.id;

    const deletedResultat = await resultatService.deleteResultatById(
      resultId,
      useNewDb(req)
    );

    if (!deletedResultat) {
      return res.status(404).send("Resultat not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllResultat,
  addResultat,
  deleteResultatById,
  updateResultat,
};
