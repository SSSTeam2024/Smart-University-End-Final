const avisEnseignantService = require('../../services/AvisEnseignantServices/AvisEnseignantServices');
const globalFunctions = require("../../utils/globalFunctions");

const createAvisEnseignant = async (req, res) => {
  try {
    const {
      title,
      description,
      auteurId,
      departement=[],
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings=[],
      galleryExtensions=[],
      date_avis
    } = req.body;

   
    const pdfPath = "files/avisEnseignantFiles/pdf/";
    const galleryPath = "files/avisEnseignantFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'avisEnseignantPDF');
    const galleryFilenames = galleryExtensions.map((ext, index) => 
      globalFunctions.generateUniqueFilename(ext, `avisEnseignantPHOTO_${index}`)
    );
   
    let documents = [
      {
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath
      },
      ...galleryBase64Strings.map((base64String, index) => ({
        base64String: base64String,
        extension: galleryExtensions[index],
        name: galleryFilenames[index],
        path: galleryPath
      }))
    ];
    const avisEnseignant = await avisEnseignantService.createAvisEnseignant({
      title,
      description,
      auteurId,
      departement,
      lien,
      pdf: pdfFilename,
      gallery: galleryFilenames,
      date_avis
    }, documents);

    res.status(201).json(avisEnseignant);
  } catch (error) {
    console.error("Error creating AvisEnseignant:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllAvisEnseignants = async (req, res) => {
  try {
    const avisEnseignants = await avisEnseignantService.getAllAvisEnseignants();
    res.status(200).json(avisEnseignants);
  } catch (error) {
    console.error("Error fetching all AvisEnseignants:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAvisEnseignantById = async (req, res) => {
  try {
    const avisEnseignant = await avisEnseignantService.getAvisEnseignantById(req.params.id);
    if (!avisEnseignant) {
      return res.status(404).json({ message: 'AvisEnseignant not found' });
    }
    res.status(200).json(avisEnseignant);
  } catch (error) {
    console.error("Error fetching AvisEnseignant by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAvisEnseignant = async (req, res) => {
  try {
    const updatedAvisEnseignant = await avisEnseignantService.updateAvisEnseignant(req.params.id, req.body);
    if (!updatedAvisEnseignant) {
      return res.status(404).json({ message: 'AvisEnseignant not found' });
    }
    res.status(200).json(updatedAvisEnseignant);
  } catch (error) {
    console.error("Error updating AvisEnseignant:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAvisEnseignant = async (req, res) => {
  try {
    const deletedAvisEnseignant = await avisEnseignantService.deleteAvisEnseignant(req.params.id);
    if (!deletedAvisEnseignant) {
      return res.status(404).json({ message: 'AvisEnseignant not found' });
    }
    res.status(200).json({ message: 'AvisEnseignant deleted successfully' });
  } catch (error) {
    console.error("Error deleting AvisEnseignant:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant
};
