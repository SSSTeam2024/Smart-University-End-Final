const demandPersonnelDao = require("../../dao/DemandePersonnelDao/DemandePersonnelDao");
const globalVarsDao = require("../../dao/VariableGlobaleDao/variableGlobaleDao");
const generatedDocDao = require("../../dao/GeneratedDocDao/GeneratedDocDao");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const { MimeType } = require("easy-template-x");

async function processFrenshPersonnelData(demandId, db) {
  const demandData = await demandPersonnelDao.getDemandePersonnelById(
    demandId,
    db
  );

  const personnel = demandData.personnelId;

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

  // const [an1, an2] = currentGlobalVars.annee_universitaire.split("/");

  // const [part1an1, part2an1] = an1.split("0");
  // const [part1an2, part2an2] = an2.split("0");

  const currentYear = new Date().getFullYear().toString();

  final_order_number = "N° " + orderNumber + "/" + currentYear;

  const qrData = `${demandId}-${final_order_number}`;
  const hashedData = CryptoJS.SHA256(qrData).toString(CryptoJS.enc.Hex);
  const qrImage = await fetchQRImageBuffer(
    "http://verify.eniga.smartschools.tn/verify.html?id=" + String(hashedData)
  );

  const data = {
    //* personnel data
    nom_fr: personnel.nom_fr,
    mat_cnrps: personnel.mat_cnrps,
    prenom_fr: personnel.prenom_fr,
    lieu_naissance_fr: personnel.lieu_naissance_fr,
    ddn: personnel.date_naissance, // done
    sexe: personnel.sexe,
    nationalite: personnel.nationalite,
    identifiant_unique: personnel.identifinat_unique,
    adresse_fr: personnel.adress_fr,
    etat_civil_fr: personnel.etat_civil,
    date_designation: personnel.date_designation,
    etat_compte_fr: personnel?.etat_compte?.etat_fr,
    poste_fr: personnel?.poste?.poste_fr,
    grade_fr: personnel?.grade?.grade_fr,
    service_fr: personnel?.service?.service_fr,
    categorie_fr: personnel?.categorie?.categorie_fr,
    date_affectation_fr: personnel.date_affectation,
    compte_courant_fr: personnel.compte_courant,
    cin: personnel.num_cin,
    date_delivrance: personnel.date_delivrance,
    code_postale: personnel.code_postale,
    num_tel1: personnel.num_phone1,
    num_tel2: personnel.num_phone2,
    email: personnel.email,
    nom_conjoint: personnel.nom_conjoint,
    profession_conjoint: personnel.job_conjoint,
    nombre_fils: personnel.nombre_fils,

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
    num_ordre: final_order_number,
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

  for (let index = 0; index < demandData.extra_data.length; index++) {
    const currentBody = demandData.extra_data[index].body;
    const currentValue = demandData.extra_data[index].value;
    data[currentBody] = currentValue;
  }

  return {
    information: data,
    generatedDocInfo: {
      personnel: personnel._id,
      model: demandData.piece_demande._id,
      doc: "",
      date_generation: currentTunisianDate,
      num_ordre: orderNumber,
      num_qr_code: String(hashedData),
    },
  };
}

async function processArabicPersonnelData(demandId, db) {
  const demandData = await demandPersonnelDao.getDemandePersonnelById(
    demandId,
    db
  );

  const personnel = demandData.personnelId;

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

  // const [an1, an2] = currentGlobalVars.annee_universitaire.split("/");

  // const [part1an1, part2an1] = an1.split("0");
  // const [part1an2, part2an2] = an2.split("0");

  const currentYear = new Date().getFullYear().toString();

  final_order_number = orderNumber + "/" + currentYear + " عدد";

  const qrData = `${demandId}-${final_order_number}`;
  const hashedData = CryptoJS.SHA256(qrData).toString(CryptoJS.enc.Hex);
  const qrImage = await fetchQRImageBuffer(
    "http://verify.eniga.smartschools.tn/verify.html?id=" + String(hashedData)
  );

  const data = {
    //* personnel data
    nom_ar: personnel.nom_ar,
    mat_cnrps: personnel.mat_cnrps,
    prenom_ar: personnel.prenom_ar,
    lieu_naissance_ar: personnel.lieu_naissance_ar,
    ddn: personnel.date_naissance,
    sexe: personnel.sexe,
    nationalite: personnel.nationalite,
    identifiant_unique: personnel.identifinat_unique,
    adresse_ar: personnel.adress_ar,
    etat_civil_ar: personnel.etat_civil,
    date_designation: personnel.date_designation,
    etat_compte_ar: personnel?.etat_compte?.etat_ar,
    poste_ar: personnel?.poste?.poste_ar,
    grade_ar: personnel?.grade?.grade_ar,
    service_ar: personnel?.service?.service_ar,
    categorie_ar: personnel?.categorie?.categorie_ar,
    date_affectation: personnel.date_affectation,
    compte_courant: personnel.compte_courant,
    cin: personnel.num_cin,
    date_delivrance: personnel.date_delivrance,

    code_postale: personnel.code_postale,
    num_tel1: personnel.num_phone1,
    num_tel2: personnel.num_phone2,
    email: personnel.email,
    nom_conjoint: personnel.nom_conjoint,
    profession_conjoint: personnel.job_conjoint,
    nombre_fils: personnel.nombre_fils,
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
    num_ordre: final_order_number,
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


  for (let index = 0; index < demandData.extra_data.length; index++) {

    const currentBody = demandData.extra_data[index].body;
    const currentValue = demandData.extra_data[index].value;

    if (currentBody === 'noms_enfants' || currentBody === 'dates_naiss' || currentBody === 'status_fils' || currentBody === 'dates_etats') {
      data[currentBody] = currentValue.replace(/#/g, '\n');
    } else {
      data[currentBody] = currentValue;
    }

  }
  return {
    information: data,
    generatedDocInfo: {
      personnel: personnel?._id,
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
  processFrenshPersonnelData,
  processArabicPersonnelData,
};
