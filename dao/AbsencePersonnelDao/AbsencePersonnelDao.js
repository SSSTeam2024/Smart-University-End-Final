const AbsencePersonnelSchema = require("../../model/AbsencePersonnelModel/AbsencePersonnelModel");

function getAbsencePersonnelModel(dbConnection) {
  return (
    dbConnection.models.AbsencePersonnel ||
    dbConnection.model("AbsencePersonnel", AbsencePersonnelSchema)
  );
}

const createAbsencePersonnel = async (absencePersonnelData, dbName) => {
  const AbsencePersonnel = getAbsencePersonnelModel(dbName);
  const absencePersonnel = new AbsencePersonnel(absencePersonnelData);
  return absencePersonnel.save();
};

const getAllAbsencesPersonnels = async (dbName) => {
  const AbsencePersonnel = getAbsencePersonnelModel(dbName);
  return AbsencePersonnel.find()
    .populate({
      path: "personnels",
      populate: { path: "personnel" },
    })
    .populate("added_by");
};

const getAbsencePersonnelById = async (id, dbName) => {
  const AbsencePersonnel = getAbsencePersonnelModel(dbName);
  return AbsencePersonnel.findById(id)
    .populate({
      path: "personnels",
      populate: { path: "personnel" },
    })
    .populate("added_by");
};

const updateAbsencePersonnel = async (id, updateData, dbName) => {
  const AbsencePersonnel = getAbsencePersonnelModel(dbName);
  return AbsencePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAbsencePersonnel = async (id, dbName) => {
  const AbsencePersonnel = getAbsencePersonnelModel(dbName);
  return AbsencePersonnel.findByIdAndDelete(id);
};

module.exports = {
  createAbsencePersonnel,
  getAllAbsencesPersonnels,
  getAbsencePersonnelById,
  updateAbsencePersonnel,
  deleteAbsencePersonnel,
};
