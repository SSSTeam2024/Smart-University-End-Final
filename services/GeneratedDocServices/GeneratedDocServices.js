const generatedDocDao = require('../../dao/GeneratedDocDao/GeneratedDocDao');

const saveGeneratedDoc = async (generatedDocData) => {
    return await generatedDocDao.saveGenerated(generatedDocData);
};

const getGeneratedDocsByModelId = async (model_id) => {
  return generatedDocDao.getGenerartedDocsByModelId(model_id);
};

// const getAllAbsencesPersonnels = async () => {
//   return absencePersonnelDao.getAllAbsencesPersonnels();
// };

// const updateAbsencePersonnel = async (id, updateData) => {
 
//     return await absencePersonnelDao.updateAbsencePersonnel(id, updateData);
// };

// const deleteAbsencePersonnel = async (id) => {
//   return absencePersonnelDao.deleteAbsencePersonnel(id);
// };

module.exports = {
  saveGeneratedDoc,
  getGeneratedDocsByModelId,
  // getAllAbsencesPersonnels,
  // updateAbsencePersonnel,
  // deleteAbsencePersonnel
};