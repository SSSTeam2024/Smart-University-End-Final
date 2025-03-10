const GeneratedDocModel = require("../../model/GeneratedDocModel/GeneratedDocModel");

const saveGenerated = async (generatedDocData) => {
  const generatedDoc = new GeneratedDocModel(generatedDocData);
  return generatedDoc.save();
};

const getGenerartedDocsByModelId = async (model_id) => {
  const query = {
    model: model_id,
  };
  return await GeneratedDocModel.find(query)
    .populate("model")
    .populate("enseignant")
    .populate("etudiant")
    .populate("personnel");
};

// const getAllAbsencesPersonnels = async () => {
//   return AbsencePersonnel.find().populate('personnel');
// };

// const updateAbsencePersonnel = async (id, updateData) => {
//   return AbsencePersonnel.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteAbsencePersonnel = async (id) => {
//   return AbsencePersonnel.findByIdAndDelete(id);
// };

module.exports = {
  saveGenerated,
  getGenerartedDocsByModelId,
  // getAllAbsencesPersonnels,
  // updateAbsencePersonnel,
  // deleteAbsencePersonnel
};
