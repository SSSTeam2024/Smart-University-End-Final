const CourrierEntrantServices = require("../../services/CourrierEntrantServices/CourrierEntrantServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addCourrierEntrant = async (req, res) => {
  try {
    const {
      num_ordre,
      date_arrive,
      num_courrier,
      date_courrier,
      source,
      destinataire,
      sujet,
      date_livraison,
      file_base64_string,
      file_extension,
    } = req.body;

    const courrierEntrantPath = "files/courrierEntrantFiles/";

    let file = globalFunctions.generateUniqueFilename(
      file_extension,
      "courrierEntrant"
    );

    let documents = [
      {
        base64String: file_base64_string,
        extension: file_extension,
        name: file,
        path: courrierEntrantPath,
      },
    ];

    const CourrierEntrant = await CourrierEntrantServices.createCourrierEntrant(
      {
        num_ordre,
        date_arrive,
        num_courrier,
        date_courrier,
        source,
        destinataire,
        sujet,
        date_livraison,
        file,
      },
      documents,
      useNewDb(req)
    );
    res.json(CourrierEntrant);
  } catch (error) {
    console.error(error);
  }
};

const updateCourrierEntrantById = async (req, res) => {
  try {
    const CourrierEntrantId = req.params.id;
    const {
      num_ordre,
      date_arrive,
      num_courrier,
      date_courrier,
      source,
      destinataire,
      sujet,
      date_livraison,
      file_base64_string,
      file_extension,
    } = req.body;

    const courrierEntrantPath = "files/courrierEntrantFiles/";

    let courrierEntrantBody = {
      num_ordre,
      date_arrive,
      num_courrier,
      date_courrier,
      source,
      destinataire,
      sujet,
      date_livraison,
    };
    let file;
    let documents = [];

    if (file_base64_string && file_extension) {
      file = globalFunctions.generateUniqueFilename(
        file_extension,
        "courrierEntrant"
      );
      courrierEntrantBody.file = file;

      documents.push({
        base64String: file_base64_string,
        extension: file_extension,
        name: file,
        path: courrierEntrantPath,
      });
    }

    const updatedCourrierEntrant =
      await CourrierEntrantServices.updateCourrierEntrant(
        CourrierEntrantId,
        courrierEntrantBody,
        documents,
        useNewDb(req)
      );

    if (!updatedCourrierEntrant) {
      return res.status(404).send("Courrier Entrant not found!");
    }
    res.json(updatedCourrierEntrant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllCourrierEntrant = async (req, res) => {
  try {
    const CourrierEntrant = await CourrierEntrantServices.getAllCourrierEntrant(
      useNewDb(req)
    );
    res.json(CourrierEntrant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getLastCourrierEntrant = async (req, res) => {
  try {
    const lastCourrierEntrant =
      await CourrierEntrantServices.getLastCourrierEntrant(useNewDb(req));
    if (!lastCourrierEntrant) {
      return res.status(404).json({ message: "No courrier entrant found" });
    }
    res.json(lastCourrierEntrant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCourrierEntrantById = async (req, res) => {
  try {
    const CourrierEntrantId = req.params.id;

    const deletedCourrierEntrant =
      await CourrierEntrantServices.deleteCourrierEntrant(
        CourrierEntrantId,
        useNewDb(req)
      );

    if (!deletedCourrierEntrant) {
      return res.status(404).send("Courrier Entrant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteCourrierEntrantById,
  getAllCourrierEntrant,
  updateCourrierEntrantById,
  addCourrierEntrant,
  getLastCourrierEntrant,
};
