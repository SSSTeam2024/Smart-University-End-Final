const postePersonnelService = require("../../services/PostePersonnelServices/PostePersonnelServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createPostePersonnel = async (req, res) => {
  try {
    const { poste_ar, poste_fr } = req.body;

    const postetPersonnel = await postePersonnelService.createPostePersonnel(
      {
        poste_ar,
        poste_fr,
      },
      useNewDb(req)
    );
    res.json(postetPersonnel);
  } catch (error) {
    console.error(error);
  }
};

const updatePostePersonnelById = async (req, res) => {
  try {
    const postePersonnelId = req.params.id;
    const { poste_ar, poste_fr } = req.body;

    const updatedPostePersonnel =
      await postePersonnelService.updatePostePersonnelDao(
        postePersonnelId,
        {
          poste_ar,
          poste_fr,
        },
        useNewDb(req)
      );

    if (!updatedPostePersonnel) {
      return res.status(404).send("Poste Personnel not found!");
    }
    res.json(updatedPostePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPostePersonnelById = async (req, res) => {
  try {
    const postePersonnelId = req.params.id;

    const getPostePersonnel =
      await postePersonnelService.getPostePersonnelDaoById(
        postePersonnelId,
        useNewDb(req)
      );

    if (!getPostePersonnel) {
      return res.status(404).send("Poste Personnel not found");
    }
    res.json(getPostePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllPostesPersonnel = async (req, res) => {
  try {
    const postePersonnels = await postePersonnelService.getPostesPersonnelDao(
      useNewDb(req)
    );
    res.json(postePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePostePersonnelById = async (req, res) => {
  try {
    const postePersonnelId = req.params.id;

    const deletedPostePersonnel =
      await postePersonnelService.deletePostePersonnelDao(
        postePersonnelId,
        useNewDb(req)
      );

    if (!deletedPostePersonnel) {
      return res.status(404).send("Poste Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPosteByValue = async (req, res) => {
  try {
    const { poste_fr, poste_ar } = req.body;

    if (!poste_fr || !poste_ar) {
      return res
        .status(400)
        .json({ message: "poste_ar and poste_fr are required" });
    }

    const posteValue = await postePersonnelService.getPosteByValue(
      {
        poste_fr,
        poste_ar,
      },
      useNewDb(req)
    );

    if (!posteValue) {
      return res.json(null);
    }

    res.json({
      id: posteValue._id,
      poste_fr: posteValue.poste_fr,
      poste_ar: posteValue.poste_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deletePostePersonnelById,
  getAllPostesPersonnel,
  getPostePersonnelById,
  createPostePersonnel,
  updatePostePersonnelById,
  getPosteByValue,
};
