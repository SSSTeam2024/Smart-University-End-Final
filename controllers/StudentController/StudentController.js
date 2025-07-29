const studentService = require("../../services/EtudiantServices/EtudiantService");
const globalFunctions = require("../../utils/globalFunctions");
const Etudiant = require("../../model/EtudiantModel/EtudiantModel");
const fs = require("fs");
const path = require("path");
const TypeInscriptionEtudiant = require("../../model/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel");
const generateCode = require("../../utils/generateCode");
const emailService = require("../../services/EmailServices/emailService");
const emailStructure = require("../../utils/emailInscription");
const { v4: uuidv4 } = require("uuid");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

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
      password,
      //! TO Verify if we keep these fields or not !!
      num_inscri,
      Niveau_Fr,
      DIPLOME,
      Spécialité,
      Groupe,
      Cycle,
      Ann_Univ,
      Modele_Carte,
      NiveauAr,
      DiplomeAr,
      SpecialiteAr,
      etat_compte_Ar,
      type_inscription_ar,
      nbre_enfants,
      etablissement_conjoint,
      profesion_Conjoint,
      prenom_conjoint,
      Cycle_Ar,
      ville,
      pays_bac,
      mention,
      situation_militaire,
      tel_parents,
      pays_parents,
      gouvernorat_parents,
      code_postale_parents,
      adresse_parents,
      etat_mere,
      etablissement_mere,
      profession_mere,
      prenom_mere,
      etat_pere,
      prenom_pere,
      pays,
      gouvernorat,
      matricule_number,
      passeport_number,
      cnss_number,
      emails,
      mention_university_ar,
      mention_university_fr,
      session_university_fr,
      session_university_ar,
      historique_etudiant
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

    subscriptionFiles = [];

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

      subscriptionFiles.push({
        fileType: fileTypeNameFr,
        name: fileFullPath,
      });

      documents.push({
        base64String,
        extension: fileExtension,
        name: fileFullPath,
        path: filePath,
      });
    }

    const filesArray = subscriptionFiles.map((file) => {
      return {
        file_type: file.fileType,
        fileName: file.name,
      };
    });

const updatedHistoriqueEtudiant = (historique_etudiant || []).map((item, index) => {
      const updatedItem = { ...item };

      // fichier_affectation
      if (item.fichier_departBase64 && item.fichier_departExtension) {
        const filename = globalFunctions.generateUniqueFilename(
          item.fichier_departExtension,
          `fichier_depart_${index}`
        );
        updatedItem.fichier_affectation = filename;
        documents.push({
          base64String: item.fichier_departBase64,
          extension: item.fichier_departExtension,
          name: filename,
          path: "files/etudiantFiles/historique/",
        });
      }
        return updatedItem;
    });

    const code = generateCode.generateCompositeCode();
    let pwd = String(num_CIN).split("").reverse().join("");
    
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
        files: filesArray,
        code_acces: code,
        password: pwd,
        //! TO Verify if we keep these fields or not !!
        num_inscri,
        Niveau_Fr,
        DIPLOME,
        Spécialité,
        Groupe,
        Cycle,
        Ann_Univ,
        Modele_Carte,
        NiveauAr,
        DiplomeAr,
        SpecialiteAr,
        etat_compte_Ar,
        type_inscription_ar,
        nbre_enfants,
        etablissement_conjoint,
        profesion_Conjoint,
        prenom_conjoint,
        Cycle_Ar,
        ville,
        pays_bac,
        mention,
        situation_militaire,
        tel_parents,
        pays_parents,
        gouvernorat_parents,
        code_postale_parents,
        adresse_parents,
        etat_mere,
        etablissement_mere,
        profession_mere,
        prenom_mere,
        etat_pere,
        prenom_pere,
        pays,
        gouvernorat,
        matricule_number,
        passeport_number,
        cnss_number,
        mention_university_ar,
        mention_university_fr,
        session_university_fr,
        session_university_ar,
        historique_etudiant: updatedHistoriqueEtudiant
      },
      documents,
      useNewDb(req)
    );
    // console.log(emails.length);
    // for (const email_to_sent of emails) {
    //   // const emailToSend = prepareEmailInscription(
    //   //   email_to_sent,
    //   //   prenom_fr,
    //   //   nom_fr,
    //   //   code,
    //   //   num_CIN,
    //   //   etudiant.createdAt
    //   // );
    //   console.log(email_to_sent);
    //   // await emailService.sendEmail(emailToSend);
    // }
    // const emailToSend = prepareEmailInscription(
    //   email,
    //   prenom_fr,
    //   nom_fr,
    //   code,
    //   num_CIN,
    //   etudiant.createdAt
    // );
    // setTimeout(() => {
    //   console.log("email To Send");
    // }, 1000);

    // await emailService.sendEmail(emailToSend);
    res.json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// const getAllStudents = async (req, res) => {
//   try {
//     const etudiants = await studentService.getEtudiants();
//     res.json(etudiants);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

const getAllStudents = async (req, res) => {
  try {
    const etudiants = await studentService.getEtudiants(useNewDb(req));
    res.json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getEtudiantById(
      req.body._id,
      useNewDb(req)
    );
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

    const deletedEtudiant = await studentService.deleteEtudiant(
      etudiantId,
      useNewDb(req)
    );

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
      req.body._id
    );

    // Destructure the request body
    const {
      _id,
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
      etat_compte_Ar,
      type_inscription_ar,
      nbre_enfants,
      etablissement_conjoint,
      profesion_Conjoint,
      prenom_conjoint,
      Cycle_Ar,
      ville,
      pays_bac,
      mention,
      situation_militaire,
      tel_parents,
      pays_parents,
      gouvernorat_parents,
      code_postale_parents,
      adresse_parents,
      etat_mere,
      etablissement_mere,
      profession_mere,
      prenom_mere,
      etat_pere,
      prenom_pere,
      pays,
      gouvernorat,
      matricule_number,
      passeport_number,
      cnss_number,
      historique_etudiant,
      files = [],
    } = req.body;

    // Define file paths
   const filePaths = {
      face1CIN: "files/etudiantFiles/Face1CIN/",
      face2CIN: "files/etudiantFiles/Face2CIN/",
      fichePaiement: "files/etudiantFiles/FichePaiement/",
      photoProfil: "files/etudiantFiles/PhotoProfil/",
      // additional: "files/etudiantFiles/Additional/",
    };

    const generateUniqueFilename = (extension, name) => {
      if (!extension) {
        throw new Error(`File extension is missing for ${name}.`);
      }
      return `${uuidv4()}_${name}.${extension}`;
    };

    const saveFile = (base64String, filePath, fileName) => {
      if (base64String) {
        fs.mkdirSync(filePath, { recursive: true });
        const buffer = Buffer.from(base64String, "base64");
        const fullPath = path.join(filePath, fileName);
        fs.writeFileSync(fullPath, buffer);
        console.log(`[${requestId}] File saved at: ${fullPath}`);
        return fullPath;
      }
      return null;
    };

    // Prepare documents array
   const documents = [];

    if (Face1CINFileBase64String && Face1CINFileExtension) {
      const name = generateUniqueFilename(Face1CINFileExtension, "face_1_CIN");
      saveFile(Face1CINFileBase64String, filePaths.face1CIN, name);
      documents.push({ name });
    }

    if (Face2CINFileBase64String && Face2CINFileExtension) {
      const name = generateUniqueFilename(Face2CINFileExtension, "face_2_CIN");
      saveFile(Face2CINFileBase64String, filePaths.face2CIN, name);
      documents.push({ name });
    }

    if (FichePaiementFileBase64String && FichePaiementFileExtension) {
      const name = generateUniqueFilename(
        FichePaiementFileExtension,
        "fiche_paiement"
      );
      saveFile(FichePaiementFileBase64String, filePaths.fichePaiement, name);
      documents.push({ name });
    }

    if (PhotoProfilFileBase64String && PhotoProfilFileExtension) {
      const name = generateUniqueFilename(
        PhotoProfilFileExtension,
        "photo_profil"
      );
      saveFile(PhotoProfilFileBase64String, filePaths.photoProfil, name);
      documents.push({ name });
    }


    // Construct update object

     let subscriptionFiles = [];
      for (const file of files) {
      const { name_fr, base64String, extension } = file;
      if (!base64String || !extension) {
        return res.status(400).json({
          error: `Missing base64 or extension for file type: ${name_fr}`,
        });
      }

      const dir = path.join(filePaths.additional, name_fr);
      const filename = generateUniqueFilename(extension, name_fr);
      saveFile(base64String, dir, filename);

      subscriptionFiles.push({
        fileType: name_fr,
        name: filename,
      });
    }

    const filesArray = subscriptionFiles.map((file) => ({
      file_type: file.fileType,
      fileName: file.name,
    }));
  
    const historiqueEtudiantPath = "files/etudiantFiles/historique/";

    const updatedHistoriqueEtudiant = (historique_etudiant || []).map((item, index) => {
      const updatedItem = { ...item };

      // fichier_affectation
      if (item.fichier_departBase64 && item.fichier_departExtension) {
        const filename = generateUniqueFilename(
          item.fichier_departExtension,
          `fichier_depart_${index}`
        );
        saveFile(item.fichier_departBase64, historiqueEtudiantPath, filename);
        updatedItem.fichier_depart = filename;
      }

    
      return updatedItem;
    });

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
      etat_compte_Ar,
      type_inscription_ar,
      nbre_enfants,
      etablissement_conjoint,
      profesion_Conjoint,
      prenom_conjoint,
      Cycle_Ar,
      ville,
      pays_bac,
      mention,
      situation_militaire,
      tel_parents,
      pays_parents,
      gouvernorat_parents,
      code_postale_parents,
      adresse_parents,
      etat_mere,
      etablissement_mere,
      profession_mere,
      prenom_mere,
      etat_pere,
      prenom_pere,
      pays,
      gouvernorat,
      matricule_number,
      passeport_number,
      cnss_number,
      files: filesArray,
      historique_etudiant: updatedHistoriqueEtudiant
    };

     // Assign uploaded file names to specific fields
    for (const doc of documents) {
      if (doc.name.includes("face_1_CIN")) updateFields.face_1_CIN = doc.name;
      if (doc.name.includes("face_2_CIN")) updateFields.face_2_CIN = doc.name;
      if (doc.name.includes("fiche_paiement"))
        updateFields.fiche_paiement = doc.name;
      if (doc.name.includes("photo_profil"))
        updateFields.photo_profil = doc.name;
    }

    // Perform the database update
    const updatedEtudiant = await studentService.updateEtudiant(
      _id,
      updateFields,
      useNewDb(req)
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
      studentId,
      useNewDb(req)
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
      groupeClasseId,
      useNewDb(req)
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

    const getEtudiant = await studentService.getEtudiantById(
      etudiantId,
      useNewDb(req)
    );

    if (!getEtudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.json(getEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiantsByIdClasse = async (req, res) => {
  try {
    const classeId = req.params.id;

    const getEtudiants = await studentService.getEtudiantsByIdClasse(
      classeId,
      useNewDb(req)
    );

    if (!getEtudiants) {
      return res.status(404).send("Aucun Etudiant pour ce groupe !!");
    }
    res.json(getEtudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiantByCin = async (req, res) => {
  try {
    const cin_etudiant = req.params.id;
    const etudiant = await studentService.getEtudiantByCin(
      cin_etudiant,
      useNewDb(req)
    );

    if (!etudiant) {
      return res.status(404).send("Aucun Etudiant avec cette C.I.N");
    }
    res.json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiantByCinAndCode = async (req, res) => {
  try {
    const { cin_etudiant, codesecret } = req.body;
    const etudiant = await studentService.getEtudiatByCinAndCode(
      cin_etudiant,
      codesecret,
      useNewDb(req)
    );

    if (!etudiant) {
      return res.status(404).send("Aucun Etudiant avec C.I.N et code donné");
    }
    res.json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiantByToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).send("Token missing");
    }
    const etudiant = await studentService.getEtudiantByToken(
      token,
      useNewDb(req)
    );
    if (!etudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.json(etudiant);
  } catch (error) {
    console.error(`Get etudiant by token error controller: ${error.message}`);
    res.status(500).send(error.message);
  }
};
const login = async (req, res) => {
  try {
    const { cin, password } = req.body;
    const etudiant = await studentService.login(cin, password, useNewDb(req));
    res.json({ message: "Login successful", etudiant });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

function prepareEmailInscription(email, prenom, nom, code, cin, date) {
  let recipient = email;
  let pwd = String(cin).split("").reverse().join("");

  let formattedDate = new Date(date)
    .toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  let emailBody = emailStructure.emailTemplates.email_inscription(
    prenom,
    nom,
    code,
    pwd,
    cin,
    formattedDate
  );
  let emailSubject = "Confirmation d'inscription et code d'accès";
  let fullEmailObject = {
    to: recipient,
    subject: emailSubject,
    body: emailBody,
  };
  return fullEmailObject;
}

const getNbrEtudiantsByClasses = async (req, res) => {
  try {
    const { classeIds } = req.body;

    const nbrEtudiants = await studentService.getNbrEtudiantsByClasses(
      classeIds,
      useNewDb(req)
    );

    console.log("Nombre Etudiants", nbrEtudiants);

    if (!nbrEtudiants) {
      return res.status(404).send("Aucun Etudiant pour ces groupes !!");
    }
    res.json({ nbr: nbrEtudiants });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const logoutEtudiant = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedStudent = await studentService.logoutEtudiant(
      studentId,
      useNewDb(req)
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging out student" });
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
  getEtudiantsByIdClasse,
  getEtudiantByCin,
  getEtudiantByCinAndCode,
  getEtudiantByToken,
  login,
  getNbrEtudiantsByClasses,
  logoutEtudiant,
};
