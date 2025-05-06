const demandStudentDao = require("../../dao/DemandeEtudiantDao/DemandeEtudiantDao");
const globalVarsDao = require("../../dao/VariableGlobaleDao/variableGlobaleDao");
const generatedDocDao = require("../../dao/GeneratedDocDao/GeneratedDocDao");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const { MimeType } = require("easy-template-x");

async function processFrenshStudentData(demandId, db) {
  const demandData = await demandStudentDao.getDemandeEtudiantById(
    demandId,
    db
  );
  const student = demandData.studentId;

  const allGlobalVars = await globalVarsDao.getVariableGlobales(db);
  const currentGlobalVars = allGlobalVars[allGlobalVars.length - 1];

  const currentTunisianDate = new Intl.DateTimeFormat("fr-TN", {
    timeZone: "Africa/Tunis",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // "dd/mm/yyyy"

  const generatedDocs = await generatedDocDao.getGenerartedDocsByModelId(
    demandData.piece_demande._id,
    db
  );
  let orderNumber = "";
  if (generatedDocs.length === 0) {
    orderNumber = "01";
  } else {
    orderNumber = (generatedDocs.length + 1).toString().padStart(2, "0");
  }

  const [an1, an2] = currentGlobalVars.annee_universitaire.split("/");

  const [part1an1, part2an1] = an1.split("0");
  const [part1an2, part2an2] = an2.split("0");
  filnal_order_number = "N° " + orderNumber + "/" + part2an1 + part2an2;

  const qrData = `${demandId}-${filnal_order_number}`;
  const hashedData = CryptoJS.SHA256(qrData).toString(CryptoJS.enc.Hex);
  const qrImage = await fetchQRImageBuffer(
    "http://verify.eniga.smartschools.tn/verify.html?id=" + String(hashedData)
  );

  const data = {
    //* Student data
    nom_fr: student.nom_fr,
    ddn: student.date_naissance,
    classe_fr: student.groupe_classe.nom_classe_fr,
    lieu_naissance_fr: student.lieu_naissance_fr,
    adresse_fr: student.adress_fr,
    sexe_fr: student.sexe,
    num_tel: student.num_phone,
    nom_pere_fr: student.nom_pere,
    nom_mere_fr: student.nom_mere,
    nationalite_fr: student.nationalite,
    email: student.email,
    cin: student.num_CIN,
    prenom_fr: student.prenom_fr,
    etat_civil_fr: student.etat_civil,
    num_inscription: student.num_inscri,
    diplome_fr: student.DIPLOME,
    niveau_fr: student.Niveau_Fr,
    specialite_fr: student.Spécialité,
    cycle_fr: student.Cycle,
    passeport: student.passeport_number,
    //* Global vars data
    date_present: currentTunisianDate,
    nom_sec_gen_fr: currentGlobalVars.secretaire_fr,
    nom_dir_fr: currentGlobalVars.directeur_fr,
    nom_etab_fr: currentGlobalVars.etablissement_fr,
    nom_univ_fr: currentGlobalVars.universite_fr,
    adresse_etab_fr: currentGlobalVars.address_fr,
    phone_etab: currentGlobalVars.phone,
    fax_etab: currentGlobalVars.fax,
    site_web_etab: currentGlobalVars.website,
    annee_univ: currentGlobalVars.annee_universitaire,
    ville_fr: currentGlobalVars.gouvernorat_fr,
    num_ordre: filnal_order_number,
    qr_code: {
      _type: "image",
      source: qrImage,
      format: MimeType.Png,
      width: 100,
      height: 100,
      altText: "QR Code",
    },
    link: `http://verify.eniga.smartschools.tn/verify.html?id=${String(
      hashedData
    )}`,
  };
  return {
    information: data,
    generatedDocInfo: {
      etudiant: student._id,
      model: demandData.piece_demande._id,
      doc: "",
      date_generation: currentTunisianDate,
      num_ordre: orderNumber,
      num_qr_code: String(hashedData),
    },
  };
}

async function processArabicStudentData(demandId, db) {
  const demandData = await demandStudentDao.getDemandeEtudiantById(
    demandId,
    db
  );
  console.log("demandData", demandData);
  const student = demandData.studentId;

  const allGlobalVars = await globalVarsDao.getVariableGlobales(db);
  const currentGlobalVars = allGlobalVars[allGlobalVars.length - 1];

  const currentTunisianDate = new Intl.DateTimeFormat("fr-TN", {
    timeZone: "Africa/Tunis",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // "dd/mm/yyyy"

  const generatedDocs = await generatedDocDao.getGenerartedDocsByModelId(
    demandData.piece_demande._id,
    db
  );
  console.log("generatedDocs", generatedDocs);
  let orderNumber = "";
  if (generatedDocs.length === 0) {
    orderNumber = "01";
  } else {
    orderNumber = (generatedDocs.length + 1).toString().padStart(2, "0");
  }

  const [an1, an2] = currentGlobalVars.annee_universitaire.split("/");

  const [part1an1, part2an1] = an1.split("0");
  const [part1an2, part2an2] = an2.split("0");
  filnal_order_number = orderNumber + "/" + part2an1 + part2an2 + " عدد";

  const qrData = `${demandId}-${filnal_order_number}`;
  const hashedData = CryptoJS.SHA256(qrData).toString(CryptoJS.enc.Hex);
  const qrImage = await fetchQRImageBuffer(
    "http://verify.eniga.smartschools.tn/verify.html?id=" + String(hashedData)
  );

  const data = {
    //* Student data
    nom_ar: student.nom_ar,
    prenom_ar: student.prenom_ar,
    ddn: student.date_naissance,
    num_tel: student.num_phone,
    nationalite_ar: student.nationalite,
    adresse_ar: student.adress_ar,
    sexe_ar: student.sexe,
    lieu_naissance_ar: student.lieu_naissance_ar,
    classe_ar: student.groupe_classe.nom_classe_ar,
    email: student.email,
    cin: student.num_CIN,
    etat_civil_ar: student.etat_civil,
    num_inscription: student.num_inscri,
    diplome_ar: student.DiplomeAr,
    niveau_ar: student.NiveauAr,
    specialite_ar: student.SpecialiteAr,
    cycle_ar: student.Cycle_Ar,
    passeport: student.passeport_number,
    //* Global vars data
    date_present: currentTunisianDate,
    nom_dir_ar: currentGlobalVars.directeur_ar,
    nom_sec_gen_ar: currentGlobalVars.secretaire_ar,
    nom_etab_ar: currentGlobalVars.etablissement_ar,
    nom_univ_ar: currentGlobalVars.universite_ar,
    phone_etab: currentGlobalVars.phone,
    fax_etab: currentGlobalVars.fax,
    site_web_etab: currentGlobalVars.website,
    adress_etab_ar: currentGlobalVars.address_ar,
    annee_univ: currentGlobalVars.annee_universitaire,
    ville_ar: currentGlobalVars.gouvernorat_ar,
    //* Params
    num_ordre: filnal_order_number,
    qr_code: {
      _type: "image",
      source: qrImage,
      format: MimeType.Png,
      width: 100,
      height: 100,
      altText: "QR Code",
    },
    link: `http://verify.eniga.smartschools.tn/verify.html?id=${String(
      hashedData
    )}`,
    //* Parentheses
    open_parenthese: "(",
    closed_parenthese: ")",
  };
  return {
    information: data,
    generatedDocInfo: {
      etudiant: student._id,
      model: demandData.piece_demande._id,
      doc: "",
      date_generation: currentTunisianDate,
      num_ordre: orderNumber,
      num_qr_code: String(hashedData),
    },
  };
}

async function fetchQRImageBuffer(qrData) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
    qrData
  )}`;
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
}

module.exports = {
  processFrenshStudentData,
  processArabicStudentData,
};
