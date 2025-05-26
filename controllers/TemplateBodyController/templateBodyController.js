const templateBodyService = require("../../services/TemplateBodyServices/templateBodyServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addTemplateBody = async (req, res) => {
  try {
    const {
      title,
      fileBase64,
      fileExtension,
      fileName,
      langue,
      intended_for,
      has_code,
      has_number,
    } = req.body;

    let documents = [];

    const modelsPath = "files/Modeles/";

    const randomString = globalFunctions.generateRandomString();

    let doc = `${fileName}_${randomString}.${fileExtension}`;

    documents.push({
      base64String: fileBase64,
      name: doc,
      extension: fileExtension,
      path: modelsPath,
    });

    const templateBody = await templateBodyService.createTemplateBody(
      {
        title,
        doc,
        langue,
        intended_for,
        has_code,
        has_number,
      },
      documents,
      useNewDb(req)
    );

    res.json(templateBody);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllTemplateBodys = async (req, res) => {
  try {
    const templateBodys = await templateBodyService.getTemplateBodys(
      useNewDb(req)
    );
    res.json(templateBodys);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllTemplateBodyById = async (req, res) => {
  try {
    const templateBody = await templateBodyService.getTemplateBodyById(
      req.body._id,
      useNewDb(req)
    );
    if (!templateBody) {
      return res.status(404).json({ message: "templateBody not found" });
    }
    res.status(200).json(templateBody);
  } catch (error) {
    console.error("Error fetching templateBody by ID:", error);
    res.status(500).json({ message: error.message });
  }
};
const deleteTemplateBody = async (req, res) => {
  try {
    const deleteTemplateBody = await templateBodyService.deleteTemplateBody(
      req.params.id,
      useNewDb(req)
    );
    if (!deleteTemplateBody) {
      return res.status(404).json({ message: "template not found" });
    }
    res.status(200).json({ message: "template deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTemplateBodyByContext = async (req, res) => {
  try {
    const templateBodies = await templateBodyService.getTemplateBodyByContext(
      req.body.intended_for,
      useNewDb(req)
    );
    if (!templateBodies) {
      return res.status(404).json({ message: "template bodies not found" });
    }
    res.status(200).json(templateBodies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTemplateBodyById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      fileBase64,
      fileExtension,
      fileName,
      oldFileName,
      langue,
      intended_for,
      has_code,
      has_number,
    } = req.body;

    let documents = [];

    const modelsPath = "files/Modeles/";

    const randomString = globalFunctions.generateRandomString();

    if (fileName && fileBase64 && fileExtension) {
      let doc = `${fileName}_${randomString}.${fileExtension}`;

      documents.push({
        base64String: fileBase64,
        name: doc,
        extension: fileExtension,
        path: modelsPath,
      });

      const updatedTemplate = await templateBodyService.updateTemplateBodyById(
        id,
        {
          title,
          doc,
          langue,
          intended_for,
          has_code,
          has_number,
        },
        documents,
        oldFileName,
        useNewDb(req)
      );
      res.status(200).json(updatedTemplate);
    }
    else {
      const updatedTemplate = await templateBodyService.updateTemplateBodyById(
        id,
        {
          title,
          langue,
          intended_for,
          has_code,
          has_number,
        },
        documents,
        '',
        useNewDb(req)
      );
      res.status(200).json(updatedTemplate);
    }


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  addTemplateBody,
  getAllTemplateBodys,
  getAllTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
  updateTemplateBodyById,
};
