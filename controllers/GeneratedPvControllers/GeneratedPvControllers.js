const GeneratedPvServices = require("../../services/GeneratedPvServices/GeneratedPvServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createGeneratedPv = async (req, res) => {
  try {
    const { titre, content, commission } = req.body;

    const generatedPv = await GeneratedPvServices.createGeneratedPv(
      {
        titre,
        content,
        commission,
      },
      useNewDb(req)
    );
    res.json(generatedPv);
  } catch (error) {
    console.error(error);
  }
};

const updateGeneratedPv = async (req, res) => {
  try {
    const generatedPvId = req.params.id;
    const {
      titre,
      content,
      commission,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const pvPath = "files/pvFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "PV"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: pvPath,
      },
    ];

    const updatedGeneratedPv = await GeneratedPvServices.updateGeneratedPv(
      generatedPvId,
      {
        titre,
        content,
        commission,
        fichier,
      },
      documents,
      useNewDb(req)
    );

    if (!updatedGeneratedPv) {
      return res.status(404).send("Generated Pv not found!");
    }
    res.json(updatedGeneratedPv);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getGeneratedPvs = async (req, res) => {
  try {
    const GeneratedPvs = await GeneratedPvServices.getGeneratedPvs(
      useNewDb(req)
    );
    res.json(GeneratedPvs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteGeneratedPv = async (req, res) => {
  try {
    const generatedPvId = req.params.id;

    const deletedGeneratedPv = await GeneratedPvServices.deleteGeneratedPv(
      generatedPvId,
      useNewDb(req)
    );

    if (!deletedGeneratedPv) {
      return res.status(404).send("Generated Pv not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteGeneratedPv,
  getGeneratedPvs,
  updateGeneratedPv,
  createGeneratedPv,
};
