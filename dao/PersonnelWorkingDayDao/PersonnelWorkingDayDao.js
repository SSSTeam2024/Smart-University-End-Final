const personnelWorkingDaySchema = require("../../model/PersonnelWorkingDayModel/PersonnelWorkingDayModel");

function getPersonnelWorkingDayModel(dbConnection) {
  return (
    dbConnection.models.PersonnelWorkingDay ||
    dbConnection.model("PersonnelWorkingDay", personnelWorkingDaySchema)
  );
}

const createPersonnelWorkingDay = async (params, dbName) => {
  const PersonnelWorkingDay = await getPersonnelWorkingDayModel(dbName);
  return await PersonnelWorkingDay.create(params);
};

const getPersonnelWorkingDay = async (dbName) => {
  const PersonnelWorkingDay = await getPersonnelWorkingDayModel(dbName);
  return await PersonnelWorkingDay.find();
};

const updatePersonnelWorkingDay = async (id, updateData, dbName) => {
  const PersonnelWorkingDay = await getPersonnelWorkingDayModel(dbName);
  return PersonnelWorkingDay.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePersonnelWorkingDay = async (id, dbName) => {
  const PersonnelWorkingDay = await getPersonnelWorkingDayModel(dbName);
  return PersonnelWorkingDay.findByIdAndDelete(id);
};

module.exports = {
  createPersonnelWorkingDay,
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  deletePersonnelWorkingDay,
};
