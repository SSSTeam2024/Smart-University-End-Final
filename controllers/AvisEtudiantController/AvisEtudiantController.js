const avisEtudiantService = require("../../services/AvisEtudiantServices/AvisEtudiantServices");
const globalFunctions = require("../../utils/globalFunctions");
function useNewDb(req) {
  console.log("req.headers", typeof req.headers["x-use-new-db"]);
  return req.headers["x-use-new-db"] === "true";
}
const createAvisEtudiant = async (req, res) => {
  try {
    const {
      title,
      description,
      auteurId,
      groupe_classe = [],
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings = [],
      galleryExtensions = [],
      date_avis,
    } = req.body;

    const pdfPath = "files/avisEtudiantFiles/pdf/";
    const galleryPath = "files/avisEtudiantFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(
      pdfExtension,
      "avisEtudiantPDF"
    );
    const galleryFilenames = galleryExtensions.map((ext, index) =>
      globalFunctions.generateUniqueFilename(ext, `avisEtudiantPHOTO_${index}`)
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
    const avisEtudiant = await avisEtudiantService.createAvisEtudiant(
      {
        title,
        description,
        auteurId,
        groupe_classe,
        lien,
        pdf: pdfFilename,
        gallery: galleryFilenames,
        date_avis,
      },
      documents,
      useNewDb(req)
    );

    res.status(201).json(avisEtudiant);
  } catch (error) {
    console.error("Error creating AvisEtudiant:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllAvisEtudiants = async (req, res) => {
  try {
    const avisEtudiants = await avisEtudiantService.getAllAvisEtudiants(
      useNewDb(req)
    );
    res.status(200).json(avisEtudiants);
  } catch (error) {
    console.error("Error fetching all AvisEtudiants:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAvisEtudiantById = async (req, res) => {
  try {
    const avisEtudiant = await avisEtudiantService.getAvisEtudiantById(
      req.body._id,
      useNewDb(req)
    );
    if (!avisEtudiant) {
      return res.status(404).json({ message: "AvisEtudiant not found" });
    }
    res.status(200).json(avisEtudiant);
  } catch (error) {
    console.error("Error fetching AvisEtudiant by ID:", error);
    res.status(500).json({ message: error.message });
  }
};
const updateAvisEtudiant = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      auteurId,
      groupe_classe = [],
      lien,
      gallery = [],
      pdf,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings = [],
      galleryExtensions = [],
      date_avis,
    } = req.body;

    const pdfPath = "files/avisEtudiantFiles/pdf/";
    const galleryPath = "files/avisEtudiantFiles/photo/";

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
    newGalleryFileNames = newGalleryFileNames.concat(gallery);

    // Perform update through service
    const updatedAvisEtudiant = await avisEtudiantService.updateAvisEtudiant(
      _id,
      {
        title,
        description,
        groupe_classe,
        auteurId,
        lien,
        pdf: documents.find((doc) => doc.path === pdfPath)?.name || pdf,
        gallery: newGalleryFileNames,
        date_avis,
      },
      documents,
      useNewDb(req)
    );

    if (!updatedAvisEtudiant) {
      return res.status(404).json({ message: "Avis Etudiant not found" });
    }

    res.status(200).json(updatedAvisEtudiant);
  } catch (error) {
    console.error("Error updating Avis Etudiant:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAvisEtudiant = async (req, res) => {
  try {
    const deletedAvisEtudiant = await avisEtudiantService.deleteAvisEtudiant(
      req.body._id,
      useNewDb(req)
    );
    if (!deletedAvisEtudiant) {
      return res.status(404).json({ message: "Avis Etudiant not found" });
    }
    res.status(200).json({ message: "Avis Etudiant deleted successfully" });
  } catch (error) {
    console.error("Error deleting Avis Etudiant:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteManyAvisEtudiant = async (req, res) => {
  try {
    const avisIds = req.body.ids;

    if (!avisIds || avisIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteAvisResult = await avisEtudiantService.deleteAvisEtudiants(
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
  createAvisEtudiant,
  getAllAvisEtudiants,
  getAvisEtudiantById,
  updateAvisEtudiant,
  deleteAvisEtudiant,
  deleteManyAvisEtudiant,
};
