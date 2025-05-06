const servicePersonnelSchema = require("../../model/ServicePersonnelModel/ServicePersonnelModel");

function getServicePersonnelModel(dbConnection) {
  return (
    dbConnection.models.ServicePersonnel ||
    dbConnection.model("ServicePersonnel", servicePersonnelSchema)
  );
}

const createServicePersonnel = async (service_personnel, dbName) => {
  const servicePersonnel = await getServicePersonnelModel(dbName);
  return await servicePersonnel.create(service_personnel);
};

const getServicesPersonnel = async (dbName) => {
  const servicePersonnel = await getServicePersonnelModel(dbName);
  return await servicePersonnel.find();
};

const updateServicePersonnel = async (id, updateData, dbName) => {
  const servicePersonnel = await getServicePersonnelModel(dbName);
  return await servicePersonnel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteServicePersonnel = async (id, dbName) => {
  const servicePersonnel = await getServicePersonnelModel(dbName);
  return await servicePersonnel.findByIdAndDelete(id);
};

const getServicePersonnelById = async (id, dbName) => {
  const servicePersonnel = await getServicePersonnelModel(dbName);
  return await servicePersonnel.findById(id);
};

const getServiceByValue = async (service_ar, service_fr, dbName) => {
  const servicePersonnel = await getServicePersonnelModel(dbName);
  return await servicePersonnel.findOne({ service_ar, service_fr });
};

module.exports = {
  createServicePersonnel,
  getServicesPersonnel,
  updateServicePersonnel,
  deleteServicePersonnel,
  getServicePersonnelById,
  getServiceByValue,
};
