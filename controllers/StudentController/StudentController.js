const studentService = require("../../services/EtudiantServices/EtudiantService");
const globalFunctions = require("../../utils/globalFunctions");
const Etudiant = require("../../model/EtudiantModel/EtudiantModel");
const fs = require("fs");
const path = require("path");
const TypeInscriptionEtudiant = require("../../model/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel");
const generateCode = require("../../utils/generateCode");

const addStudent = async (req, res) => {
  try {
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_ar,
      lieu_naissance_fr,
      date_naissance,
      nationalite,
      sexe,
      etat_civil,
      num_CIN,
      Face1CINFileBase64String,
      Face1CINFileExtension,
      Face2CINFileBase64String,
      Face2CINFileExtension,
      FichePaiementFileBase64String,
      FichePaiementFileExtension,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone,
      email,
      nom_pere,
      job_pere,
      nom_mere,
      num_phone_tuteur,
      moyen,
      session,
      filiere,
      niveau_scolaire,
      annee_scolaire,
      type_inscription,
      etat_compte,
      groupe_classe,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
      files = [],
      code_acces,
    } = req.body;

    const face1CINPath = "files/etudiantFiles/Face1CIN/";
    const face2CINPath = "files/etudiantFiles/Face2CIN/";
    const fichePaiementPath = "files/etudiantFiles/FichePaiement/";
    const PhotoProfilPath = "files/etudiantFiles/PhotoProfil/";

    let face_1_CIN = globalFunctions.generateUniqueFilename(
      Face1CINFileExtension,
      "face_1_CIN"
    );

    let face_2_CIN = globalFunctions.generateUniqueFilename(
      Face2CINFileExtension,
      "face_2_CIN"
    );

    let fiche_paiement = globalFunctions.generateUniqueFilename(
      FichePaiementFileExtension,
      "fiche_paiement"
    );

    let photo_profil = globalFunctions.generateUniqueFilename(
      PhotoProfilFileExtension,
      "photo_profil"
    );

    const typeInscription = await TypeInscriptionEtudiant.findById(
      type_inscription
    );
    if (!typeInscription) {
      return res.status(404).json({ error: "Type inscription not found" });
    }

    const filesTypeInscription = typeInscription.files_type_inscription;

    let documents = [
      {
        base64String: Face1CINFileBase64String,
        extension: Face1CINFileExtension,
        name: face_1_CIN,
        path: face1CINPath,
      },
      {
        base64String: Face2CINFileBase64String,
        extension: Face2CINFileExtension,
        name: face_2_CIN,
        path: face2CINPath,
      },
      {
        base64String: FichePaiementFileBase64String,
        extension: FichePaiementFileExtension,
        name: fiche_paiement,
        path: fichePaiementPath,
      },
      {
        base64String: PhotoProfilFileBase64String,
        extension: PhotoProfilFileExtension,
        name: photo_profil,
        path: PhotoProfilPath,
      },
    ];

    for (let i = 0; i < files.length; i++) {
      const fileTypeNameFr = files[i].name_fr;
      const base64String = files[i].base64String;
      const fileExtension = files[i].extension;
      if (!base64String || !fileExtension) {
        return res.status(400).json({
          error: `Base64 string or extension is undefined for file type: ${fileTypeNameFr}`,
        });
      }

      const filePath = `files/etudiantFiles/Additional/${fileTypeNameFr}/`;
      let fileFullPath = globalFunctions.generateUniqueFilename(
        fileExtension,
        fileTypeNameFr
      );

      documents.push({
        base64String,
        extension: fileExtension,
        name: fileFullPath,
        path: filePath,
      });
    }
    const code = generateCode.generateCompositeCode();
    const etudiant = await studentService.registerEtudiant(
      {
        nom_fr,
        nom_ar,
        prenom_fr,
        prenom_ar,
        lieu_naissance_ar,
        lieu_naissance_fr,
        date_naissance,
        nationalite,
        sexe,
        etat_civil,
        num_CIN,
        state,
        dependence,
        code_postale,
        adress_ar,
        adress_fr,
        num_phone,
        email,
        nom_pere,
        job_pere,
        nom_mere,
        num_phone_tuteur,
        moyen,
        session,
        filiere,
        niveau_scolaire,
        annee_scolaire,
        type_inscription,
        etat_compte,
        groupe_classe,
        face_1_CIN,
        face_2_CIN,
        fiche_paiement,
        photo_profil,
        files: documents.map((doc) => doc.name),
        code_acces: code,
      },
      documents
    );

    res.json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllStudents = async (req, res) => {
  try {
    const etudiants = await studentService.getEtudiants();
    res.json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getEtudiantById(req.body._id);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteEtudiant = async (req, res) => {
  try {
    const etudiantId = req.body._id;

    const deletedEtudiant = await studentService.deleteEtudiant(etudiantId);

    if (!deletedEtudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.status(200).json({ msg: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateStudent = async (req, res) => {
  const requestId =
    new Date().toISOString() + Math.random().toString(36).substring(2, 15); // Unique request identifier

  try {
    console.log(
      `[${requestId}] Received request to update student with ID:`,
      req.body.id
    );

    // Destructure the request body
    const {
      id,
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_ar,
      lieu_naissance_fr,
      date_naissance,
      nationalite,
      sexe,
      etat_civil,
      num_CIN,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone,
      email,
      nom_pere,
      job_pere,
      nom_mere,
      num_phone_tuteur,
      moyen,
      session,
      filiere,
      niveau_scolaire,
      annee_scolaire,
      type_inscription,
      etat_compte,
      groupe_classe,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
      Face1CINFileBase64String,
      Face1CINFileExtension,
      Face2CINFileBase64String,
      Face2CINFileExtension,
      FichePaiementFileBase64String,
      FichePaiementFileExtension,
    } = req.body;

    // Define file paths
    const face1CINPath = "files/etudiantFiles/Face1CIN/";
    const face2CINPath = "files/etudiantFiles/Face2CIN/";
    const fichePaiementPath = "files/etudiantFiles/FichePaiement/";
    const photoProfilPath = "files/etudiantFiles/PhotoProfil/";

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
    if (Face1CINFileBase64String && Face1CINFileExtension) {
      const face1CINName = generateUniqueFilename(
        Face1CINFileExtension,
        "face_1_CIN"
      );
      saveFile(Face1CINFileBase64String, face1CINPath, face1CINName);
      documents.push({ name: face1CINName });
    }
    if (Face2CINFileBase64String && Face2CINFileExtension) {
      const face2CINName = generateUniqueFilename(
        Face2CINFileExtension,
        "face_2_CIN"
      );
      saveFile(Face2CINFileBase64String, face2CINPath, face2CINName);
      documents.push({ name: face2CINName });
    }
    if (FichePaiementFileBase64String && FichePaiementFileExtension) {
      const fichePaiementName = generateUniqueFilename(
        FichePaiementFileExtension,
        "fiche_paiement"
      );
      saveFile(
        FichePaiementFileBase64String,
        fichePaiementPath,
        fichePaiementName
      );
      documents.push({ name: fichePaiementName });
    }
    if (PhotoProfilFileBase64String && PhotoProfilFileExtension) {
      const photoProfilName = generateUniqueFilename(
        PhotoProfilFileExtension,
        "photo_profil"
      );
      saveFile(PhotoProfilFileBase64String, photoProfilPath, photoProfilName);
      documents.push({ name: photoProfilName });
    }

    // Construct update object
    const updateFields = {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_ar,
      lieu_naissance_fr,
      date_naissance,
      nationalite,
      sexe,
      etat_civil,
      num_CIN,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone,
      email,
      nom_pere,
      job_pere,
      nom_mere,
      num_phone_tuteur,
      moyen,
      session,
      filiere,
      niveau_scolaire,
      annee_scolaire,
      type_inscription,
      etat_compte,
      groupe_classe,
    };

    // Conditionally add file paths to update object
    if (documents.length > 0) {
      documents.forEach((doc) => {
        if (doc.name.includes("face_1_CIN")) updateFields.face_1_CIN = doc.name;
        if (doc.name.includes("face_2_CIN")) updateFields.face_2_CIN = doc.name;
        if (doc.name.includes("fiche_paiement"))
          updateFields.fiche_paiement = doc.name;
        if (doc.name.includes("photo_profil"))
          updateFields.photo_profil = doc.name;
      });
    }

    // Update student in the database
    const updatedEtudiant = await studentService.updateEtudiant(
      id,
      updateFields
    );

    if (!updatedEtudiant) {
      console.log(`[${requestId}] Etudiant not found!`);
      return res.status(404).send("Etudiant not found!");
    }

    console.log(`[${requestId}] Student updated successfully`);
    res.json(updatedEtudiant);
  } catch (error) {
    console.error(`[${requestId}] Error updating student:`, error);
    res.status(500).send(error.message);
  }
};

const getTypeInscriptionByIdStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).send("Student ID is required");
    }

    const typeInscription = await studentService.getTypeInscriptionByIdStudent(
      studentId
    );

    if (!typeInscription) {
      return res.status(404).send("Type inscription not found for the student");
    }

    res.json(typeInscription);
  } catch (error) {
    console.error("Error fetching TypeInscription by Student ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateGroupeClasse = async (req, res) => {
  try {
    const { studentIds, groupeClasseId } = req.body;

    if (!studentIds || !groupeClasseId) {
      return res
        .status(400)
        .json({ error: "studentIds and groupeClasseId are required." });
    }

    const result = await studentService.updateGroupeClasse(
      studentIds,
      groupeClasseId
    );
    res.json({ message: "groupe_classe updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiantById = async (req, res) => {
  try {
    const etudiantId = req.params.id;

    const getEtudiant = await studentService.getEtudiantById(etudiantId);

    if (!getEtudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.json(getEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  deleteEtudiant,
  updateStudent,
  getTypeInscriptionByIdStudent,
  updateGroupeClasse,
  getEtudiantById,
};
