const avisEnseignantService = require("../../services/AvisEnseignantServices/AvisEnseignantServices");
const globalFunctions = require("../../utils/globalFunctions");
function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}
const createAvisEnseignant = async (req, res) => {
  try {
    const {
      title,
      description,
      auteurId,
      departement = [],
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings = [],
      galleryExtensions = [],
      date_avis,
    } = req.body;

    const pdfPath = "files/avisEnseignantFiles/pdf/";
    const galleryPath = "files/avisEnseignantFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(
      pdfExtension,
      "avisEnseignantPDF"
    );
    const galleryFilenames = galleryExtensions.map((ext, index) =>
      globalFunctions.generateUniqueFilename(
        ext,
        `avisEnseignantPHOTO_${index}`
      )
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
    const avisEnseignant = await avisEnseignantService.createAvisEnseignant(
      {
        title,
        description,
        auteurId,
        departement,
        lien,
        pdf: pdfFilename,
        gallery: galleryFilenames,
        date_avis,
      },
      documents,
      useNewDb(req)
    );

    res.status(201).json(avisEnseignant);
  } catch (error) {
    console.error("Error creating AvisEnseignant:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllAvisEnseignants = async (req, res) => {
  try {
    const avisEnseignants = await avisEnseignantService.getAllAvisEnseignants(
      useNewDb(req)
    );

    res.status(200).json(avisEnseignants);
  } catch (error) {
    console.error("Error fetching all AvisEnseignants:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAvisEnseignantById = async (req, res) => {
  try {
    const avisEnseignant = await avisEnseignantService.getAvisEnseignantById(
      req.body._id,
      useNewDb(req)
    );
    if (!avisEnseignant) {
      return res.status(404).json({ message: "AvisEnseignant not found" });
    }
    res.status(200).json(avisEnseignant);
  } catch (error) {
    console.error("Error fetching AvisEnseignant by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAvisEnseignant = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      auteurId,
      departement = [],
      lien,
      pdf,
      pdfBase64String,
      pdfExtension,
      gallery = [],
      galleryBase64Strings = [],
      galleryExtensions = [],
      date_avis,
    } = req.body;

    const pdfPath = "files/avisEnseignantFiles/pdf/";
    const galleryPath = "files/avisEnseignantFiles/photo/";

    let documents = [];
  let newGalleryFileNames = [];

    // Handle PDF upload
    if (pdfBase64String && pdfExtension) {
      const pdfFilename = globalFunctions.generateUniqueFilename(
        pdfExtension,
        "AvisEtudiantPDF"
      );
      documents.push({
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath,
      });
    }

    // Handle gallery images upload
    if (galleryBase64Strings.length > 0 && galleryExtensions.length > 0) {
      const galleryFilenames = galleryExtensions.map((ext, index) =>
        globalFunctions.generateUniqueFilename(ext, `AvisEtudiantPHOTO_${index}`)
      );

      galleryBase64Strings.forEach((base64String, index) => {
        documents.push({
          base64String,
          extension: galleryExtensions[index],
          name: galleryFilenames[index],
          path: galleryPath,
        });
      });

      newGalleryFileNames = newGalleryFileNames.concat(
        documents
          .filter((doc) => doc.path === galleryPath)
          .map((doc) => doc.name)
      );
    }

    // Combine new + existing gallery file names
  const keptGalleryFileNames = Array.isArray(gallery) ? gallery : [];
newGalleryFileNames = [...newGalleryFileNames, ...keptGalleryFileNames];


    const updatedAvisEnseignant =
      await avisEnseignantService.updateAvisEnseignant(
        _id,
        {
          title,
          description,
          departement: [],
          auteurId,
          lien,
          pdf: documents.find((doc) => doc.path === pdfPath)?.name,
          gallery: newGalleryFileNames,
          date_avis,
        },
        documents,
        useNewDb(req)
      );

    if (!updatedAvisEnseignant) {
      return res.status(404).json({ message: "Avis Enseignant not found" });
    }

    res.status(200).json(updatedAvisEnseignant);
  } catch (error) {
    console.error("Error updating Avis Enseignant :", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAvisEnseignant = async (req, res) => {
  try {
    const deletedAvisEnseignant =
      await avisEnseignantService.deleteAvisEnseignant(
        req.body._id,
        useNewDb(req)
      );
    if (!deletedAvisEnseignant) {
      return res.status(404).json({ message: "AvisEnseignant not found" });
    }
    res.status(200).json({ message: "AvisEnseignant deleted successfully" });
  } catch (error) {
    console.error("Error deleting AvisEnseignant:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteManyAvisEnseignants = async (req, res) => {
  try {
    const avisIds = req.body.ids;

    if (!avisIds || avisIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteAvisResult = await avisEnseignantService.deleteAvisEnseignants(
      useNewDb(req),
      avisIds
    );

    if (deleteAvisResult.deletedCount === 0) {
      return res.status(404).send("No Avis found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant,
  deleteManyAvisEnseignants,
};
