const typeParcoursService = require("../../services/TypeParcoursServices/TypeParcoursServices");

const createTypeParcours = async (req, res) => {
  try {
    const { name_type_parcours_fr, name_type_parcours_ar, abreviation } =
      req.body;

    const typeParcours = await typeParcoursService.createTypeParcours({
      name_type_parcours_fr,
      name_type_parcours_ar,
      abreviation,
    });
    res.json(typeParcours);
  } catch (error) {
    console.error(error);
  }
};

const updateTypeParcours = async (req, res) => {
  try {
    const typeParcoursId = req.params.id;
    const { name_type_parcours_fr, name_type_parcours_ar, abreviation } =
      req.body;

    const updatedTypeParcours = await typeParcoursService.updateTypeParcours(
      typeParcoursId,
      {
        name_type_parcours_fr,
        name_type_parcours_ar,
        abreviation,
      }
    );

    if (!updatedTypeParcours) {
      return res.status(404).send("Type Parcours not found!");
    }
    res.json(updatedTypeParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTypesParcours = async (req, res) => {
  try {
    const typeParcours = await typeParcoursService.getTypeParcours();
    res.json(typeParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteTypeParcours = async (req, res) => {
  try {
    const typeParcoursId = req.params.id;

    const deletedTypeParcours = await typeParcoursService.deleteTypeParcours(
      typeParcoursId
    );

    if (!deletedTypeParcours) {
      return res.status(404).send("Type Parcours not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTypeParcoursByValue = async (req, res) => {
  try {
    const { name_type_parcours_fr, name_type_parcours_ar } = req.body;
    if (!name_type_parcours_fr || !name_type_parcours_ar) {
      return res.status(400).json({
        message: "name_type_parcours_fr and name_type_parcours_ar are required",
      });
    }

    const typeParcoursValue = await typeParcoursService.getTypeParcoursByValue({
      name_type_parcours_fr,
      name_type_parcours_ar,
    });

    if (!typeParcoursValue) {
      return res.json(null);
    }

    res.json({
      id: typeParcoursValue._id,
      name_type_parcours_fr: typeParcoursValue.name_type_parcours_fr,
      name_type_parcours_ar: typeParcoursValue.name_type_parcours_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteTypeParcours,
  getTypesParcours,
  updateTypeParcours,
  createTypeParcours,
  getTypeParcoursByValue,
};
