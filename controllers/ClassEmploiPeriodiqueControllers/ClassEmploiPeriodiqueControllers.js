const classEmploiPeriodiqueService = require("../../services/ClassEmploiPeriodiqueServices/ClassEmploiPeriodiqueServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createClassEmploiPeriodique = async (req, res) => {
  try {
    const { date_debut, date_fin, semestre, id_classe, etat } = req.body;

    const classEmploiPeriodique =
      await classEmploiPeriodiqueService.createClassEmploiPeriodique(
        {
          date_debut,
          date_fin,
          semestre,
          id_classe,
          etat,
        },
        useNewDb(req)
      );
    res.json(classEmploiPeriodique);
  } catch (error) {
    console.error(error);
  }
};

const updateClassEmploiPeriodique = async (req, res) => {
  try {
    const { _id, date_debut, date_fin, semestre, id_classe, etat } = req.body;

    const updatedClassEmploiPeriodique =
      await classEmploiPeriodiqueService.updateClassEmploiPeriodique(
        _id,
        {
          date_debut,
          date_fin,
          semestre,
          id_classe,
          etat,
        },
        useNewDb(req)
      );

    if (!updatedClassEmploiPeriodique) {
      return res.status(404).send("Class Emploi Periodique not found!");
    }
    res.json(updatedClassEmploiPeriodique);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getClassEmploiPeriodique = async (req, res) => {
  try {
    const id = req.params.id;
    const params = await classEmploiPeriodiqueService.getClassEmploiPeriodique(
      id,
      useNewDb(req)
    );
    res.json(params);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEmploiPeriodiqueByClass = async (req, res) => {
  try {
    const { class_id, semestre } = req.body;
    const emploi_periodique =
      await classEmploiPeriodiqueService.getEmploiPeriodiqueByClasse(
        class_id,
        semestre,
        useNewDb(req)
      );
    res.json(emploi_periodique);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  updateClassEmploiPeriodique,
  getClassEmploiPeriodique,
  createClassEmploiPeriodique,
  getEmploiPeriodiqueByClass,
};
