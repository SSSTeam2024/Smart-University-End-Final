const enseignantService = require("../../services/EnseignantServices/EnseignantServices");
const globalFunctions = require("../../utils/globalFunctions");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addEnseignant = async (req, res) => {
  try {
    // const Enseignant = await getEnseignantModel(dbName);

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
      matricule,
      mat_cnrps,
      etat_compte,
      poste,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
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
      entreprise1,
      annee_certif1,
      certif1,
      entreprise2,
      annee_certif2,
      certif2,
      entreprise3,
      annee_certif3,
      certif3,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
      situation_fr,
      situation_ar,
      educations,
      historique_positions
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
            path: "files/enseignantFiles/PhotoProfil/",
          },
        ]
      : []; // Empty array if no file data

    let pwd = String(num_cin).split("").reverse().join("");

    // Prepare enseignant data for creation
    const enseignantData = {
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
      matricule,
      mat_cnrps,
      etat_compte,
      poste,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
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
      entreprise1,
      annee_certif1,
      certif1,
      entreprise2,
      annee_certif2,
      certif2,
      entreprise3,
      annee_certif3,
      situation_fr,
      situation_ar,
      certif3,
      educations,
      historique_positions,
      photo_profil: PhotoProfilFileBase64String
        ? globalFunctions.generateUniqueFilename(
            PhotoProfilFileExtension,
            "photo_profil"
          )
        : null, // Add photo filename if a profile photo is uploaded
      password: pwd,
    };

    // Call the service to register the enseignant
    const enseignant = await enseignantService.registerEnseignantDao(
      enseignantData,
      documents,
      useNewDb(req)
    );

    // Populate related data before sending the response
    const populatedEnseignant = await enseignantService.getEnseignantDaoById(
      enseignant._id,
      useNewDb(req)
    );

    res.json(populatedEnseignant);
  } catch (error) {
    console.error("Error adding enseignant:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getEnseignants = async (req, res) => {
  try {
    const enseignants = await enseignantService.getEnseignatsDao(
      useNewDb(req),
      useNewDb(req)
    );
    res.json(enseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateEnseignantById = async (req, res) => {
  const requestId =
    new Date().toISOString() + Math.random().toString(36).substring(2, 15); // Unique request identifier
  try {
    console.log(
      `[${requestId}] Received request to update enseignant with ID:`,
      req.body._id
    );

    const enseignantId = req.body._id; // Correctly use the personnel ID from the request body
    console.log(
      `[${requestId}] Received request to update enseignant with ID:`,
      enseignantId
    );

    // Validate if ID is provided
    if (!enseignantId) {
      return res.status(400).send("enseignant ID is required.");
    }
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      matricule,
      files_papier_administratif,
      mat_cnrps,
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
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,

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

      entreprise1,
      annee_certif1,
      certif1,

      entreprise2,
      annee_certif2,
      certif2,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
      situation_fr,
      situation_ar,
      educations,
      historique_positions
    } = req.body;

    const photoProfilPath = "files/enseignantFiles/PhotoProfil/";

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
      nationalite,
      etat_civil,
      files_papier_administratif,
      sexe,
      etat_compte,
      poste,
      matricule,
      mat_cnrps,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,

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

      entreprise1,
      annee_certif1,
      certif1,

      entreprise2,
      annee_certif2,
      certif2,
      photo_profil, // Correctly assign the photo profile name
      situation_fr,
      situation_ar,
      educations,
      historique_positions
    };

    // Call the service to update personnel
    const updatedEnseignant = await enseignantService.updateEnseignantDao(
      enseignantId,
      updateFields,
      useNewDb(req)
    );

    if (!updatedEnseignant) {
      return res.status(404).send("Enseignant not found!");
    }
    res.json(updatedEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEnseignantById = async (req, res) => {
  try {
    const getEnseignant = await enseignantService.getEnseignantDaoById(
      req.body._id,
      useNewDb(req)
    );

    if (!getEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.json(getEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEnseignantById = async (req, res) => {
  try {
    const enseignantId = req.params.id;

    const deletedEnseignant = await enseignantService.deleteEnseignantDao(
      enseignantId,
      useNewDb(req)
    );

    if (!deletedEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const assignPapierToTeacher = async (req, res) => {
  const { enseignantId } = req.params;
  const { papier_administratif } = req.body;
  try {
    const enseignant = await enseignantService.assignPapierToTeacher(
      enseignantId,
      papier_administratif,
      useNewDb(req)
    );
    return res.status(200).json({ success: true, data: enseignant });
  } catch (error) {
    console.error("Error in assignPapierToTeacher controller:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const fetchAllTeachersPeriods = async (req, res) => {
  try {
    const teachersPeriods = await enseignantService.fetchAllTeachersPeriods(
      useNewDb(req)
    );

    res.json(teachersPeriods);
  } catch (error) {
    console.error("Error in controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers' periods.",
    });
  }
};
const getTeachersGroupedByGrade = async (req, res) => {
  try {
    const enseignants = await enseignantService.getTeachersGroupedByGrade(
      useNewDb(req)
    );
    res.json(enseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const loginTeacher = async (req, res) => {
  try {
    const { cin, password } = req.body;
    const teacher = await enseignantService.login(cin, password, useNewDb(req));
    res.json({ message: "Login successful", teacher });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const getTeacherByCin = async (req, res) => {
  try {
    const cin_teacher = req.params.id;
    const teacher = await enseignantService.getTeacherByCin(
      cin_teacher,
      useNewDb(req)
    );

    if (!teacher) {
      return res.status(404).send("Aucun teacher avec cette C.I.N");
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const logoutTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const updatedTeacher = await enseignantService.logoutTeacher(
      teacherId,
      useNewDb(req)
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging out teacher" });
  }
};
const getTeacherByToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).send("Token missing");
    }
    const teacher = await enseignantService.getTeacherByToken(token, useNewDb(req));
    // const newDatabase = metdataService.getNewDbCache();
    if (!teacher) {
      return res.status(404).send("teacher not found");
    }

    res.json(teacher);
  } catch (error) {
    console.error(`Get teacher by token error controller: ${error.message}`);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addEnseignant,
  getEnseignants,
  deleteEnseignantById,
  getEnseignantById,
  updateEnseignantById,
  assignPapierToTeacher,
  fetchAllTeachersPeriods,
  getTeachersGroupedByGrade,
  loginTeacher,
  getTeacherByCin,
  logoutTeacher,
  getTeacherByToken
};
