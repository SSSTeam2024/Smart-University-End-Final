const CourrierSortantServices = require("../../services/CourrierSortantServices/CourrierSortantServices");
const globalFunctions = require("../../utils/globalFunctions");

const addCourrierSortant = async (req, res) => {
  try {
    const {
      num_inscription,
      date_edition,
      voie_envoi,
      destinataire,
      sujet,
      observations,
      file_base64_string,
      file_extension,
    } = req.body;

    const courrierSortantPath = "files/courrierSortantFiles/";

    let file = globalFunctions.generateUniqueFilename(
      file_extension,
      "courrierSortant"
    );

    let documents = [
      {
        base64String: file_base64_string,
        extension: file_extension,
        name: file,
        path: courrierSortantPath,
      },
    ];

    const CourrierSortant = await CourrierSortantServices.createCourrierSortant(
      {
        num_inscription,
        date_edition,
        voie_envoi,
        destinataire,
        sujet,
        observations,
        file,
      },
      documents
    );
    res.json(CourrierSortant);
  } catch (error) {
    console.error(error);
  }
};

const updateCourrierSortantById = async (req, res) => {
  try {
    const CourrierSortantId = req.params.id;
    const {
      num_inscription,
      date_edition,
      voie_envoi,
      destinataire,
      sujet,
      observations,
      file_base64_string,
      file_extension,
    } = req.body;

    const courrierSortantPath = "files/courrierSortantFiles/";
    let courrierSortantBody = {
      num_inscription,
      date_edition,
      voie_envoi,
      destinataire,
      sujet,
      observations,
    };

    let file;
    let documents = [];

    if (file_base64_string && file_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_extension,
        "courrierSortant"
      );
      courrierSortantBody.file = file;

      documents.push({
        base64String: file_base64_string,
        extension: file_extension,
        name: file,
        path: courrierSortantPath,
      });
    }

    const updatedCourrierSortant =
      await CourrierSortantServices.updateCourrierSortant(
        CourrierSortantId,
        courrierSortantBody,
        documents
      );

    if (!updatedCourrierSortant) {
      return res.status(404).send("Courrier Sortant not found!");
    }
    res.json(updatedCourrierSortant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllCourrierSortant = async (req, res) => {
  try {
    const CourrierSortant =
      await CourrierSortantServices.getAllCourrierSortant();
    res.json(CourrierSortant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCourrierSortantById = async (req, res) => {
  try {
    const CourrierSortantId = req.params.id;

    const deletedCourrierSortant =
      await CourrierSortantServices.deleteCourrierSortant(CourrierSortantId);

    if (!deletedCourrierSortant) {
      return res.status(404).send("Courrier Sortant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteCourrierSortantById,
  getAllCourrierSortant,
  updateCourrierSortantById,
  addCourrierSortant,
};
