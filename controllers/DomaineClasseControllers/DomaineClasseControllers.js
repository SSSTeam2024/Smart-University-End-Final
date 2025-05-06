const domaineService = require("../../services/DomaineClasseServices/DomaineClasseServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createDomaineClasse = async (req, res) => {
  try {
    const { abreviation, name_domaine_fr, name_domaine_ar } = req.body;

    const domaineClasse = await domaineService.createDomaineClasse(
      {
        abreviation,
        name_domaine_fr,
        name_domaine_ar,
      },
      useNewDb(req)
    );
    res.json(domaineClasse);
  } catch (error) {
    console.error(error);
  }
};

const updateDoamineClasseById = async (req, res) => {
  try {
    const domaineClasseId = req.params.id;
    const { abreviation, name_domaine_fr, name_domaine_ar } = req.body;

    const updatedDomaineClasse = await domaineService.updateDomaineClasse(
      domaineClasseId,
      {
        abreviation,
        name_domaine_fr,
        name_domaine_ar,
      },
      useNewDb(req)
    );

    if (!updatedDomaineClasse) {
      return res.status(404).send("Domaine Classe not found!");
    }
    res.json(updatedDomaineClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllDomaineClasse = async (req, res) => {
  try {
    const domaineClasses = await domaineService.getDomainesClasse(
      useNewDb(req)
    );
    res.json(domaineClasses);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDomaineClasseById = async (req, res) => {
  try {
    const doamineClasseId = req.params.id;

    const deletedDoamineClasseId = await domaineService.deleteDomaineClasse(
      doamineClasseId,
      useNewDb(req)
    );

    if (!deletedDoamineClasseId) {
      return res.status(404).send("Domaine Classe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDomaineByValue = async (req, res) => {
  try {
    const { name_domaine_fr, name_domaine_ar } = req.body;
    console.log(req.body);
    if (!name_domaine_fr || !name_domaine_ar) {
      return res
        .status(400)
        .json({ message: "name_domaine_fr and name_domaine_ar are required" });
    }

    const domaineValue = await domaineService.getDomaineByValue(
      {
        name_domaine_fr,
        name_domaine_ar,
      },
      useNewDb(req)
    );

    if (!domaineValue) {
      return res.json(null);
    }

    res.json({
      id: domaineValue._id,
      name_domaine_fr: domaineValue.name_domaine_fr,
      name_domaine_ar: domaineValue.name_domaine_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDomaineClasse,
  updateDoamineClasseById,
  getAllDomaineClasse,
  deleteDomaineClasseById,
  getDomaineByValue,
};
