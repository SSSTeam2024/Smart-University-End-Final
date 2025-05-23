const ActualiteService = require("../../services/ActualiteServices/ActualiteServices");
const globalFunctions = require("../../utils/globalFunctions");

function useNewDb(req) {
  console.log("req.headers", typeof req.headers["x-use-new-db"]);
  return req.headers["x-use-new-db"] === "true";
}

const getAllActualites = async (req, res) => {
  try {
    const Actualites = await ActualiteService.getAllActualites(useNewDb(req));
    res.status(200).json(Actualites);
  } catch (error) {
    console.error("Error fetching all Actualites:", error);
    res.status(500).json({ message: error.message });
  }
};

const createActualite = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      auteurId,
      address,
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings = [],
      galleryExtensions = [],
      date_actualite,
    } = req.body;

    const pdfPath = "files/ActualiteFiles/pdf/";
    const galleryPath = "files/ActualiteFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(
      pdfExtension,
      "ActualitePDF"
    );
    const galleryFilenames = galleryExtensions.map((ext, index) =>
      globalFunctions.generateUniqueFilename(ext, `ActualitePHOTO_${index}`)
    );

    let documents = [
      {
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath,
      },
      ...galleryBase64Strings.map((base64String, index) => ({
        base64String: base64String,
        extension: galleryExtensions[index],
        name: galleryFilenames[index],
        path: galleryPath,
      })),
    ];
    const Actualite = await ActualiteService.createActualite(
      {
        title,
        description,
        category,
        auteurId,
        address,
        lien,
        pdf: pdfFilename,
        gallery: galleryFilenames,
        date_actualite,
      },
      documents,
      useNewDb(req)
    );

    res.status(201).json(Actualite);
  } catch (error) {
    console.error("Error creating Actualite:", error);
    res.status(500).send({ message: error.message });
  }
};

const getActualiteById = async (req, res) => {
  try {
    const actualite = await ActualiteService.getActualiteById(
      req.body._id,
      useNewDb(req)
    );
    if (!actualite) {
      return res.status(404).json({ message: "Actualite not found" });
    }
    res.status(200).json(actualite);
  } catch (error) {
    console.error("Error fetching Actualite by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateActualite = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      category,
      auteurId,
      address,
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings = [],
      galleryExtensions = [],
      date_actualite,
    } = req.body;

    const pdfPath = "files/ActualiteFiles/pdf/";
    const galleryPath = "files/ActualiteFiles/photo/";

    let documents = [];

    if (pdfBase64String && pdfExtension) {
      const pdfFilename = globalFunctions.generateUniqueFilename(
        pdfExtension,
        "ActualitePDF"
      );
      documents.push({
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath,
      });
    }

    if (galleryBase64Strings.length > 0 && galleryExtensions.length > 0) {
      const galleryFilenames = galleryExtensions.map((ext, index) =>
        globalFunctions.generateUniqueFilename(ext, `ActualitePHOTO_${index}`)
      );

      galleryBase64Strings.forEach((base64String, index) => {
        documents.push({
          base64String: base64String,
          extension: galleryExtensions[index],
          name: galleryFilenames[index],
          path: galleryPath,
        });
      });
    }

    const updatedActualite = await ActualiteService.updateActualite(
      _id,
      {
        title,
        description,
        category,
        auteurId,
        address,
        lien,
        pdf: documents.find((doc) => doc.path === pdfPath)?.name,
        gallery: documents
          .filter((doc) => doc.path === galleryPath)
          .map((doc) => doc.name),
        date_actualite,
      },
      documents,
      useNewDb(req)
    );

    if (!updatedActualite) {
      return res.status(404).json({ message: "Actualite not found" });
    }

    res.status(200).json(updatedActualite);
  } catch (error) {
    console.error("Error updating Actualite:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteActualite = async (req, res) => {
  try {
    const deletedActualite = await ActualiteService.deleteActualite(
      req.body._id,
      useNewDb(req)
    );
    if (!deletedActualite) {
      return res.status(404).json({ message: "Actualite not found" });
    }
    res.status(200).json({ message: "Actualite deleted successfully" });
  } catch (error) {
    console.error("Error deleting Actualite:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteManyActualites = async (req, res) => {
  try {
    const actualiteIds = req.body.ids;

    if (!actualiteIds || actualiteIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteActualitesResult = await ActualiteService.deleteManyActualites(
      useNewDb(req),
      actualiteIds
    );

    if (deleteActualitesResult.deletedCount === 0) {
      return res.status(404).send("No Actualites found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite,
  deleteManyActualites,
};
