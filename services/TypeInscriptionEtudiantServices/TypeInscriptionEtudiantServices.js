const typeInscriptionEtudiantDao = require("../../dao/TypeInscriptionEtudiantDao/TypeInscriptionEtudiantDao");
const { getDb } = require("../../config/dbSwitcher");

const registerTypeInscriptionEtudiantt = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await typeInscriptionEtudiantDao.createTypeInscriptionEtudiant(
    userData,
    db
  );
};

const updateTypeInscriptionEtudiantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await typeInscriptionEtudiantDao.updateTypeInscriptionEtudiant(
    id,
    updateData,
    db
  );
};

const getTypeInscriptionEtudianttDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await typeInscriptionEtudiantDao.getTypeInscriptionEtudiantById(
    id,
    db
  );
};

const getTypeInscriptionsEtudianttDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await typeInscriptionEtudiantDao.getTypeInscriptionsEtudiant(
    db
  );
  return result;
};

const deleteTypeInscriptionEtudianttDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await typeInscriptionEtudiantDao.deleteTypeInscriptionEtudiant(id, db);
};

const getTypeInscriptionByValue = async ({ type_ar, type_fr }, useNew) => {
  const db = await getDb(useNew);
  return await typeInscriptionEtudiantDao.getTypeInscriptionByValue(
    type_ar,
    type_fr,
    db
  );
};

module.exports = {
  deleteTypeInscriptionEtudianttDao,
  getTypeInscriptionsEtudianttDao,
  getTypeInscriptionEtudianttDaoById,
  updateTypeInscriptionEtudiantDao,
  registerTypeInscriptionEtudiantt,
  getTypeInscriptionByValue,
};
