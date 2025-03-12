const coursEnseignantServices = require("../../services/CoursEnseignantServices/CoursEnseignantServices");
const globalFunctions = require("../../utils/globalFunctions");

const addCoursEnseignant = async (req, res) => {
  try {
    const { classe, enseignant, nom_cours, trimestre, filesData } = req.body;

    const supportPath = "files/Cours/";

    let documents = [];
    let file_cours = [];

    for (const file of filesData) {
      const randomString = globalFunctions.generateRandomString();

      let [fileNameWithoutExtension, extension] = file.fileName.split(".");

      let generatedFileName = `${fileNameWithoutExtension}_${randomString}.${file.pdfExtension}`;

      documents.push({
        base64String: file.pdfBase64String,
        name: generatedFileName,
        extension: file.pdfExtension,
        path: supportPath,
      });

      file_cours.push(generatedFileName);
    }

    const newCoursEnseignant = await coursEnseignantServices.addCoursEnseignant(
      {
        classe,
        enseignant,
        nom_cours,
        file_cours,
        trimestre,
      },
      documents
    );

    res.status(201).json(newCoursEnseignant);
  } catch (error) {
    console.error("Error creating Cours Enseignant:", error);
    res.status(500).send({ message: error.message });
  }
};

const getCoursEnseignants = async (req, res) => {
  try {
    const coursEnseignants =
      await coursEnseignantServices.getCoursEnseignants();
    res.status(200).json(coursEnseignants);
  } catch (error) {
    console.error("Error fetching all Cours Enseignants:", error);
    res.status(500).json({ message: error.message });
  }
};

const getCoursEnseignantById = async (req, res) => {
  try {
    const coursEnseignantById =
      await coursEnseignantServices.getCoursEnseignantById(req.body._id);
    if (!coursEnseignantById) {
      return res.status(404).json({ message: "Cours Enseignants not found" });
    }
    res.status(200).json(coursEnseignantById);
  } catch (error) {
    console.error("Error fetching Cours Enseignants by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getCoursEnseignantByIdClasse = async (req, res) => {
  try {
    const coursEnseignantByIdClasse =
      await coursEnseignantServices.getCoursEnseignantByIdClasse(req.body._id);
    if (!coursEnseignantByIdClasse) {
      return res.status(404).json({ message: "Cours Enseignants not found" });
    }
    res.status(200).json(coursEnseignantByIdClasse);
  } catch (error) {
    console.error("Error fetching Cours Enseignants by ID Class:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCoursEnseignant = async (req, res) => {
  try {
    const deleteCoursEnseignant =
      await coursEnseignantServices.deleteCoursEnseignant(req.body._id);
    if (!deleteCoursEnseignant) {
      return res.status(404).json({ message: "Cours Enseignants not found" });
    }
    res.status(200).json({ message: "Cours Enseignants deleted successfully" });
  } catch (error) {
    console.error("Error deleting Cours Enseignants:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateCoursEnseignant = async (req, res) => {
  try {
    const coursId = req.params.id;
    const { classe, enseignant, nom_cours, trimestre, filesData } = req.body;

    const supportPath = "files/Cours/";

    let documents = [];
    let file_cours = [];

    for (const file of filesData) {
      const randomString = globalFunctions.generateRandomString();

      let [fileNameWithoutExtension, extension] = file.fileName.split(".");

      let generatedFileName = `${fileNameWithoutExtension}_${randomString}.${file.pdfExtension}`;

      documents.push({
        base64String: file.pdfBase64String,
        name: generatedFileName,
        extension: file.pdfExtension,
        path: supportPath,
      });

      file_cours.push(generatedFileName);
    }

    const updatedCours = await coursEnseignantServices.updateCoursEnseignant(
      coursId,
      {
        classe,
        enseignant,
        nom_cours,
        file_cours,
        trimestre,
      },
      documents
    );

    if (!updatedCours) {
      return res.status(404).send("Cours not found!");
    }
    res.json(updatedCours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addCoursEnseignant,
  getCoursEnseignants,
  getCoursEnseignantById,
  updateCoursEnseignant,
  deleteCoursEnseignant,
  getCoursEnseignantByIdClasse,
};
