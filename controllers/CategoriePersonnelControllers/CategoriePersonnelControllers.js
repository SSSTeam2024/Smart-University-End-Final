const categoriePersonnelService = require("../../services/CategoriePersonnelServices/CategoriePersonnelServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addCategoriePersonnel = async (req, res) => {
  try {
    const { categorie_ar, categorie_fr } = req.body;

    const categoriePersonnel =
      await categoriePersonnelService.registerCategoriePersonnel(
        {
          categorie_ar,
          categorie_fr,
        },
        useNewDb(req)
      );
    res.json(categoriePersonnel);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).send("Value must be unique.");
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateCategoriePersonnelById = async (req, res) => {
  try {
    const categoriePersonnelId = req.params.id;
    const { categorie_ar, categorie_fr } = req.body;

    const updatedCategoriePersonnel =
      await categoriePersonnelService.updateCategoriePersonnelDao(
        categoriePersonnelId,
        {
          categorie_ar,
          categorie_fr,
        },
        useNewDb(req)
      );

    if (!updatedCategoriePersonnel) {
      return res.status(404).send("Categorie Personnel not found!");
    }
    res.json(updatedCategoriePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCategoriePersonnelById = async (req, res) => {
  try {
    const categoriePersonnelId = req.params.id;

    const getCategoriePersonnel =
      await categoriePersonnelService.getCategoriePersonnelDaoById(
        categoriePersonnelId,
        useNewDb(req)
      );

    if (!getCategoriePersonnel) {
      return res.status(404).send("Categorie Personnel not found");
    }
    res.json(getCategoriePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllCategoriePersonnel = async (req, res) => {
  try {
    const categoriePersonnels =
      await categoriePersonnelService.getCategoriesPersonnelDao(useNewDb(req));
    res.json(categoriePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCategoriePersonnelById = async (req, res) => {
  try {
    const categoriePersonnelId = req.params.id;

    const deletedEtatPersonnel =
      await categoriePersonnelService.deleteCategoriePersonnelDao(
        categoriePersonnelId,
        useNewDb(req)
      );

    if (!deletedEtatPersonnel) {
      return res.status(404).send("Categorie Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getCategoryByValue = async (req, res) => {
  try {
    const { categorie_fr, categorie_ar } = req.body;

    if (!categorie_fr || !categorie_ar) {
      return res
        .status(400)
        .json({ message: "categorie_ar and categorie_fr are required" });
    }

    const categoryValue = await categoriePersonnelService.getCategoryByValue(
      {
        categorie_fr,
        categorie_ar,
      },
      useNewDb(req)
    );

    if (!categoryValue) {
      return res.json(null);
    }

    res.json({
      id: categoryValue._id,
      categorie_fr: categoryValue.categorie_fr,
      categorie_ar: categoryValue.categorie_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteCategoriePersonnelById,
  getAllCategoriePersonnel,
  getCategoriePersonnelById,
  updateCategoriePersonnelById,
  addCategoriePersonnel,
  getCategoryByValue,
};
