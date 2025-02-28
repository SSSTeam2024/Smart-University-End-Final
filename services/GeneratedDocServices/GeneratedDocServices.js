const generatedDocDao = require('../../dao/GeneratedDocDao/GeneratedDocDao');

const saveGeneratedDoc = async (generatedDocData) => {
    return await generatedDocDao.saveGenerated(generatedDocData);
};

const getGeneratedDocsByModelId = async (model_id) => {
  return await generatedDocDao.getGenerartedDocsByModelId(model_id);
};
const getGenerartedDocsByQrCode = async (num_qr_code) => {
  return await generatedDocDao.getGenerartedDocsByQrCode(num_qr_code);
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
  getGenerartedDocsByQrCode
  // getAllAbsencesPersonnels,
  // updateAbsencePersonnel,
  // deleteAbsencePersonnel
};