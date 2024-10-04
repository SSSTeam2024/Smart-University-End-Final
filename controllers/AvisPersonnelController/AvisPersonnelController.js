const avisPersonnelService = require('../../services/AvisPersonnelServices/AvisPersonnelServices');
const globalFunctions = require("../../utils/globalFunctions");

const createAvisPersonnel = async (req, res) => {
  try {
    const {
      title,
      description,
      auteurId,
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings=[],
      galleryExtensions=[],
      date_avis
    } = req.body;

   
    const pdfPath = "files/avisPersonnelFiles/pdf/";
    const galleryPath = "files/avisPersonnelFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'avisPersonnelPDF');
    const galleryFilenames = galleryExtensions.map((ext, index) => 
      globalFunctions.generateUniqueFilename(ext, `avisPersonnelPHOTO_${index}`)
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
    const avisPersonnel = await avisPersonnelService.createAvisPersonnel({
      title,
      description,
      auteurId,
      lien,
      pdf: pdfFilename,
      gallery: galleryFilenames,
      date_avis
    }, documents);

    res.status(201).json(avisPersonnel);
  } catch (error) {
    console.error("Error creating AvisPersonnel:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllAvisPersonnels = async (req, res) => {
  try {
    const avisPersonnels = await avisPersonnelService.getAllAvisPersonnels();
    res.status(200).json(avisPersonnels);
  } catch (error) {
    console.error("Error fetching all AvisPersonnels:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAvisPersonnelById = async (req, res) => {
  try {
    const avisPersonnel = await avisPersonnelService.getAvisPersonnelById(req.params.id);
    if (!avisPersonnel) {
      return res.status(404).json({ message: 'AvisPersonnel not found' });
    }
    res.status(200).json(avisPersonnel);
  } catch (error) {
    console.error("Error fetching AvisPersonnel by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAvisPersonnel = async (req, res) => {
  try {
    const updatedAvisPersonnel = await avisPersonnelService.updateAvisPersonnel(req.params.id, req.body);
    if (!updatedAvisPersonnel) {
      return res.status(404).json({ message: 'AvisPersonnel not found' });
    }
    res.status(200).json(updatedAvisPersonnel);
  } catch (error) {
    console.error("Error updating AvisPersonnel:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAvisPersonnel = async (req, res) => {
  try {
    const deletedAvisPersonnel = await avisPersonnelService.deleteAvisPersonnel(req.params.id);
    if (!deletedAvisPersonnel) {
      return res.status(404).json({ message: 'AvisPersonnel not found' });
    }
    res.status(200).json({ message: 'AvisPersonnel deleted successfully' });
  } catch (error) {
    console.error("Error deleting AvisPersonnel:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAvisPersonnel,
  getAllAvisPersonnels,
  getAvisPersonnelById,
  updateAvisPersonnel,
  deleteAvisPersonnel
};
