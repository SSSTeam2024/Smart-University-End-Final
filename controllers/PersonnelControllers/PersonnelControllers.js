const personnelService = require("../../services/PersonnelServices/PersonnelServices");
const Personnel = require("../../model/PersonnelModel/PersonnelModel");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addPersonnel = async (req, res) => {
  try {
    const {
      nom_fr,
      category,
      files_papier_administratif,
      nom_ar,
      prenom_fr,
      mat_cnrps,
      matricule,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      departements,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
      date_designation,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
      password,
    } = req.body;

    // If PhotoProfilFileBase64String is provided, prepare the document array
    const documents = PhotoProfilFileBase64String
      ? [
          {
            base64String: PhotoProfilFileBase64String,
            extension: PhotoProfilFileExtension,
            name: globalFunctions.generateUniqueFilename(
              PhotoProfilFileExtension,
              "photo_profil"
            ),
            path: "files/personnelFiles/PhotoProfil/",
          },
        ]
      : []; // Empty array if no file data

    // Prepare personnel data for creation
    const personnelData = {
      nom_fr,
      nom_ar,
      category,
      prenom_fr,
      files_papier_administratif,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      mat_cnrps,
      matricule,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      specilaite,
      date_designation,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
      state,
      dependence,
      code_postale,
      departements,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      password,
      photo_profil: PhotoProfilFileBase64String
        ? globalFunctions.generateUniqueFilename(
            PhotoProfilFileExtension,
            "photo_profil"
          )
        : null, // Add photo filename if a profile photo is uploaded
    };

    // Call the service to register the personnel
    const personnel = await personnelService.registerPersonnelDao(
      personnelData,
      documents,
      useNewDb(req)
    );

    // Populate related data before sending the response
    const populatedPersonnel = await Personnel.findById(personnel._id)
      .populate("etat_compte")
      .populate("categorie")
      .populate("grade")
      .populate("poste")
      .populate("service");

    res.json(populatedPersonnel);
  } catch (error) {
    console.error("Error adding personnel:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getPersonnels = async (req, res) => {
  try {
    const personnels = await personnelService.getPersonnelsDao(useNewDb(req));
    res.json(personnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePersonnelById = async (req, res) => {
  const requestId =
    new Date().toISOString() + Math.random().toString(36).substring(2, 15); // Unique request identifier
  try {
    console.log(
      `[${requestId}] Received request to update personnel with ID:`,
      req.body.id
    );

    const personnelId = req.body._id; // Correctly use the personnel ID from the request body
    console.log(
      `[${requestId}] Received request to update personnel with ID:`,
      personnelId
    );

    // Validate if ID is provided
    if (!personnelId) {
      return res.status(400).send("Personnel ID is required.");
    }
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      date_designation,
      mat_cnrps,
      matricule,
      poste,
      grade,
      departements,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
    } = req.body;

    const photoProfilPath = "files/personnelFiles/PhotoProfil/";

    // Function to generate unique filenames
    const generateUniqueFilename = (extension, name) => {
      if (!extension) {
        console.log(`[${requestId}] File extension is missing for ${name}.`);
        throw new Error(`File extension is missing for ${name}.`);
      }
      return `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}_${name}.${extension}`;
    };

    // Helper function to save files
    const saveFile = (base64String, filePath, fileName) => {
      if (base64String) {
        const buffer = Buffer.from(base64String, "base64");
        const fullPath = `${filePath}${fileName}`;
        fs.writeFileSync(fullPath, buffer); // Save the file
        console.log(`[${requestId}] File saved at: ${fullPath}`);
        return fullPath; // Return the full path of the saved file
      }
      return null;
    };

    // Prepare documents array
    const documents = [];
    if (PhotoProfilFileBase64String && PhotoProfilFileExtension) {
      const photoProfilName = generateUniqueFilename(
        PhotoProfilFileExtension,
        "photo_profil"
      );
      saveFile(PhotoProfilFileBase64String, photoProfilPath, photoProfilName);
      documents.push({ name: photoProfilName });
    }

    // Extract file names from documents
    let photo_profil = null; // Initialize the variable

    if (documents.length > 0) {
      documents.forEach((doc) => {
        if (doc.name.includes("photo_profil")) photo_profil = doc.name;
      });
    }

    // Define update fields
    const updateFields = {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      mat_cnrps,
      matricule,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      departements,
      date_designation,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      photo_profil, // Correctly assign the photo profile name
    };

    // Call the service to update personnel
    const updatedPersonnel = await personnelService.updatePersonnelDao(
      personnelId,
      updateFields,
      useNewDb(req)
    );

    if (!updatedPersonnel) {
      return res.status(404).send("Personnel not found!");
    }
    res.json(updatedPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPersonnelById = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const getPersonnel = await personnelService.getPersonnelDaoById(
      personnelId,
      useNewDb(req)
    );

    if (!getPersonnel) {
      return res.status(404).send("Personnel not found");
    }
    res.json(getPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePersonnelById = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const deletedPersonnel = await personnelService.deletePersonnelDao(
      personnelId,
      useNewDb(req)
    );

    if (!deletedPersonnel) {
      return res.status(404).send("Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { cin, password } = req.body;
    const personnel = await personnelService.login(
      cin,
      password,
      useNewDb(req)
    );
    res.json({ message: "Login successful", personnel });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    const { personnelId } = req.params;
    const updatedPersonnel = await personnelService.logoutPersonnel(
      personnelId,
      useNewDb(req)
    );

    if (!updatedPersonnel) {
      return res.status(404).json({ error: "Personnel not found" });
    }

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging out Personnel" });
  }
};

module.exports = {
  addPersonnel,
  getPersonnels,
  getPersonnelById,
  updatePersonnelById,
  deletePersonnelById,
  login,
  logout,
};
