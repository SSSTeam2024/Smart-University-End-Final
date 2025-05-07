const etudiantDao = require("../dao/studentDao/studentDao.js");
const enseignantDao = require("../dao/EnseignantDao/EnseignantDao.js");
const personnelDao = require("../dao/PersonnelDao/PersonnelDao.js");
const userDao = require("../dao/userDao/userDao.js");

const etudiantService = require("../services/EtudiantServices/EtudiantService.js");
const enseignantService = require("../services/EnseignantServices/EnseignantServices.js");
const personnelService = require("../services/PersonnelServices/PersonnelServices.js");
const userService = require("../services/userServices/userService.js");

const getUserByIdV1 = async (id, userType, db) => {
  let user;
  switch (userType) {
    case "Etudiant":
      user = await etudiantDao.getEtudiantById(id, db);

      break;
    case "Enseignant":
      user = await enseignantDao.getEnseignantById(id, db);

      break;
    case "Personnel":
      user = await personnelDao.getPersonnelById(id, db);

      break;
    case "User":
      user = await userDao.getUserById(id, db);
      break;
    default:
      throw new Error(`Invalid user type: ${userType}`);
      break;
  }

  return {
    _id: user?._id,
    nom_fr: user?.nom_fr,
    prenom_fr: user?.prenom_fr,
    email: user?.email,
  };
};

const getUserByIdV2 = async (id, userType, useNewDb) => {
  let user;
  switch (userType) {
    case "Etudiant":
      user = await etudiantService.getEtudiantById(id, useNewDb);

      break;
    case "Enseignant":
      user = await enseignantService.getEnseignantDaoById(id, useNewDb);

      break;
    case "Personnel":
      user = await personnelService.getPersonnelDaoById(id, useNewDb);

      break;
    case "User":
      user = await userService.getUserById(id, useNewDb);
      break;
    default:
      throw new Error(`Invalid user type: ${userType}`);
      break;
  }

  return {
    _id: user._id,
    nom_fr: user.nom_fr,
    prenom_fr: user.prenom_fr,
    email: user.email,
  };
};

module.exports = {
  getUserByIdV1,
  getUserByIdV2,
};
