const demandTeacherDao = require("../../dao/DemandeEnseignantDao/DemandeEnseignantDao");
const globalVarsDao = require("../../dao/VariableGlobaleDao/variableGlobaleDao");
const generatedDocDao = require("../../dao/GeneratedDocDao/GeneratedDocDao");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const { MimeType } = require("easy-template-x");

async function processFrenshTeacherData(demandId, db) {
  const demandData = await demandTeacherDao.getDemandeEnseignantById(
    demandId,
    db
  );
  console.log("demandData", demandData);
  const teacher = demandData.enseignantId;

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
    //* teacher data
    nom_fr: teacher.nom_fr, //done
    ddn: teacher.date_naissance, //done
    identifiant_unique_fr: teacher.identifinat_unique, //done
    adresse_fr: teacher.adress_fr, //done
    sexe: teacher.sexe, //done
    num_tel1: teacher.num_phone1, //done
    num_tel2: teacher.num_phone2, //done
    nationalite: teacher.nationalite,
    email: teacher.email, //done
    cin: teacher.num_cin, //done
    prenom_fr: teacher.prenom_fr, //done
    etat_civil_fr: teacher.etat_civil, //done
    lieu_naissance_fr: teacher.lieu_naissance_fr, //done

    specialite_fr: teacher?.specilaite?.specialite_fr, //done
    mat_cnrps: teacher.mat_cnrps, //DONE
    etat_compte_fr: teacher?.etat_compte?.etat_fr, //done
    poste_fr: teacher?.poste?.poste_fr, //done
    grade_fr: teacher?.grade?.grade_fr, //done
    departements: teacher?.departements?.name_fr, //done
    date_affectation: teacher.date_affectation, //done
    compte_courant_fr: teacher.compte_courant, //done
    date_delivrance: teacher.date_delivrance, //done
    code_postale: teacher.code_postale, //done
    nom_conjoint: teacher.nom_conjoint, //done
    profession_conjoint_fr: teacher.job_conjoint, //done
    nombre_fils: teacher.nombre_fils, //done
    entreprise1: teacher.entreprise1, //done
    annee_certif1: teacher.annee_certif1, //done
    certif1: teacher.certif1, //done
    entreprise2: teacher.entreprise2, //done
    annee_certif2: teacher.annee_certif2, //done
    certif2: teacher.certif2, //done
    entreprise3: teacher.entreprise3,
    annee_certif3: teacher.annee_certif3, //done
    certif3: teacher.certif3, //done
    situation_fr: teacher.situation_fr, //done
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
      enseignant: teacher._id,
      model: demandData.piece_demande._id,
      doc: "",
      date_generation: currentTunisianDate,
      num_ordre: orderNumber,
      num_qr_code: String(hashedData),
    },
  };
}

async function processArabicTeacherData(demandId, db) {
  const demandData = await demandTeacherDao.getDemandeEnseignantById(
    demandId,
    db
  );
  console.log("demandData", demandData);
  const teacher = demandData.enseignantId;

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
    //* teacher data
    nom_ar: teacher?.nom_ar, //done
    ddn: teacher?.date_naissance, //done
    identifiant_unique_ar: teacher?.identifinat_unique, //done
    adresse_ar: teacher?.adress_ar, //done
    sexe: teacher?.sexe, //done
    num_tel1: teacher?.num_phone1, //done
    num_tel2: teacher?.num_phone2, //done
    nationalite: teacher?.nationalite, //done
    email: teacher?.email, //done
    cin: teacher?.num_cin, //done
    prenom_ar: teacher?.prenom_ar, //done
    etat_civil_ar: teacher?.etat_civil, //done
    lieu_naissance_ar: teacher?.lieu_naissance_ar, //done

    specialite_ar: teacher?.specilaite?.specialite_ar, //done
    mat_cnrps: teacher?.mat_cnrps, //done
    etat_compte_ar: teacher?.etat_compte?.etat_ar, //done
    poste_ar: teacher?.poste?.poste_ar, //done
    grade_ar: teacher?.grade?.grade_ar, //done
    departements_ar: teacher?.departements?.name_ar, //done
    date_affectation: teacher?.date_affectation, //done
    compte_courant_ar: teacher?.compte_courant, //done
    date_delivrance: teacher?.date_delivrance, //done
    code_postale: teacher?.code_postale, //done
    nom_conjoint: teacher?.nom_conjoint, //done
    profession_conjoint_ar: teacher?.job_conjoint, //done
    nombre_fils: teacher?.nombre_fils, //done
    entreprise1: teacher?.entreprise1, //done
    annee_certif1: teacher?.annee_certif1, //done
    certif1: teacher?.certif1, //done
    entreprise2: teacher?.entreprise2, //done
    annee_certif2: teacher?.annee_certif2, //done
    certif2: teacher?.certif2, //done
    entreprise3: teacher?.entreprise3, //done
    annee_certif3: teacher?.annee_certif3, //done
    certif3: teacher?.certif3, //done
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
      width: 70,
      height: 70,
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
      enseignant: teacher?._id,
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
  processFrenshTeacherData,
  processArabicTeacherData,
};
